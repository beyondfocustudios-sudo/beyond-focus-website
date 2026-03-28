// Microsoft Graph API — acesso ao calendário Outlook sem utilizador logado (app-only)

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";
const DANIEL_EMAIL = "daniellopes@beyondfocus.pt";

export interface CalendarEvent {
  id: string;
  subject: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  attendees: Array<{
    emailAddress: { address: string; name: string };
    status: { response: string };
  }>;
  onlineMeeting?: { joinUrl?: string };
  bodyPreview?: string;
}

async function getAccessToken(): Promise<string> {
  const tenantId = process.env.MS_GRAPH_TENANT_ID;
  const clientId = process.env.MS_GRAPH_CLIENT_ID;
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("MS Graph credentials not configured");
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token error: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function getCalendarEvents(
  startDate: Date,
  endDate: Date
): Promise<CalendarEvent[]> {
  const token = await getAccessToken();

  const start = startDate.toISOString();
  const end = endDate.toISOString();

  const res = await fetch(
    `${GRAPH_BASE}/users/${DANIEL_EMAIL}/calendarView` +
      `?startDateTime=${encodeURIComponent(start)}` +
      `&endDateTime=${encodeURIComponent(end)}` +
      `&$select=id,subject,start,end,attendees,onlineMeeting,bodyPreview` +
      `&$orderby=start/dateTime` +
      `&$top=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Calendar API error: ${err}`);
  }

  const data = await res.json();
  return data.value || [];
}

// Retorna reuniões de amanhã com externos (não beyondfocus.pt)
export async function getTomorrowMeetingsWithExternals(): Promise<CalendarEvent[]> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(dayAfter.getDate() + 1);

  const events = await getCalendarEvents(tomorrow, dayAfter);

  return events.filter((event) =>
    event.attendees?.some(
      (a) =>
        !a.emailAddress.address.toLowerCase().includes("beyondfocus.pt") &&
        a.emailAddress.address !== DANIEL_EMAIL
    )
  );
}

// ─── Rascunhos de Email (Outlook Drafts) ─────────────────────────────────

export async function createOutlookDraft({
  to,
  subject,
  htmlBody,
  replyTo,
}: {
  to: string;
  subject: string;
  htmlBody: string;
  replyTo?: string;
}): Promise<{ id: string; webLink: string } | null> {
  try {
    const token = await getAccessToken();

    const message: Record<string, unknown> = {
      subject,
      body: { contentType: "HTML", content: htmlBody },
      toRecipients: [{ emailAddress: { address: to } }],
      from: { emailAddress: { address: DANIEL_EMAIL, name: "Daniel Lopes — Beyond Focus" } },
    };

    if (replyTo) {
      message.replyTo = [{ emailAddress: { address: replyTo } }];
    }

    const res = await fetch(
      `${GRAPH_BASE}/users/${DANIEL_EMAIL}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error(`Draft creation error: ${err}`);
      return null;
    }

    const data = await res.json();
    return { id: data.id, webLink: data.webLink || "" };
  } catch (e) {
    console.error("Failed to create Outlook draft:", e);
    return null;
  }
}

export function getExternalAttendees(event: CalendarEvent) {
  return (event.attendees || []).filter(
    (a) =>
      !a.emailAddress.address.toLowerCase().includes("beyondfocus.pt") &&
      a.emailAddress.address !== DANIEL_EMAIL
  );
}

// ─── Transcrições de reuniões Teams ────────────────────────────────────────

export interface OnlineMeeting {
  id: string;
  joinWebUrl: string;
}

export interface MeetingTranscript {
  id: string;
  createdDateTime: string;
}

// Encontra uma reunião Teams pelo joinUrl (armazenado em calls.meeting_url)
export async function getOnlineMeetingByJoinUrl(joinUrl: string): Promise<OnlineMeeting | null> {
  const token = await getAccessToken();

  const res = await fetch(
    `${GRAPH_BASE}/users/${DANIEL_EMAIL}/onlineMeetings?$filter=JoinWebUrl eq '${encodeURIComponent(joinUrl)}'`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data.value?.[0] || null;
}

// Lista transcrições disponíveis para uma reunião
export async function getMeetingTranscripts(meetingId: string): Promise<MeetingTranscript[]> {
  const token = await getAccessToken();

  const res = await fetch(
    `${GRAPH_BASE}/users/${DANIEL_EMAIL}/onlineMeetings/${encodeURIComponent(meetingId)}/transcripts`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.value || [];
}

// Download do conteúdo da transcrição em texto simples
export async function getTranscriptContent(meetingId: string, transcriptId: string): Promise<string | null> {
  const token = await getAccessToken();

  const res = await fetch(
    `${GRAPH_BASE}/users/${DANIEL_EMAIL}/onlineMeetings/${encodeURIComponent(meetingId)}/transcripts/${encodeURIComponent(transcriptId)}/content?$format=text/vtt`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) return null;
  const vtt = await res.text();

  // Converter VTT para texto limpo (remover timestamps e tags)
  return vtt
    .split("\n")
    .filter(line => line.trim() && !line.startsWith("WEBVTT") && !line.match(/^\d{2}:\d{2}/) && !line.match(/^NOTE/) && !line.match(/^\d+$/))
    .join(" ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
