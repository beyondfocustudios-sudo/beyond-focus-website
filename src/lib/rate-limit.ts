/**
 * Simple in-memory sliding-window rate limiter.
 * Best-effort on Vercel (multiple instances share no state),
 * but stops basic abuse within a single cold-start.
 *
 * Usage:
 *   const ok = rateLimit(request, { limit: 5, windowMs: 60_000 });
 *   if (!ok) return NextResponse.json({ error: "..." }, { status: 429 });
 */

const store = new Map<string, number[]>();

export function rateLimit(
  request: Request,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): boolean {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const windowStart = now - windowMs;

  const hits = (store.get(ip) || []).filter((t) => t > windowStart);
  hits.push(now);
  store.set(ip, hits);

  // Prune old keys occasionally to avoid memory leak
  if (store.size > 10_000) {
    for (const [key, times] of store.entries()) {
      if (times.every((t) => t <= windowStart)) store.delete(key);
    }
  }

  return hits.length <= limit;
}
