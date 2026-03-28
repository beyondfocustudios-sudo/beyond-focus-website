"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface LeadForm {
  name: string;
  email: string;
}

const INACTIVITY_MS = 30_000;
const WHATSAPP_NUMBER = "351937350178";

function trackGA4(event: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as { gtag?: (...args: unknown[]) => void }).gtag!("event", event, {
      event_category: "chatbot",
      ...params,
    });
  }
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full bg-[#0E3A45]/40"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! Sou o assistente da Beyond Focus. Como posso ajudar?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: "", email: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show after 15 seconds
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 15_000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Inactivity timer — minimise after 30s
  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => setOpen(false), INACTIVITY_MS);
  }, []);

  useEffect(() => {
    if (open) resetInactivity();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [open, resetInactivity]);

  const handleOpen = () => {
    setVisible(true);
    setOpen(true);
    trackGA4("chatbot_open");
  };

  const detectLeadIntent = (text: string) => {
    const triggers = ["orçamento", "preço", "quanto", "projeto", "projecto", "contacto", "email", "falar", "reunião"];
    return triggers.some((t) => text.toLowerCase().includes(t));
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    resetInactivity();
    setInput("");
    trackGA4("chatbot_message", { message_length: String(content.length) });

    const userMessage: Message = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: updatedMessages.slice(-11, -1),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: (err as { error?: string }).error || "Ocorreu um erro. Tenta novamente.",
          },
        ]);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantText += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: assistantText };
            return next;
          });
        }
      }

      if (detectLeadIntent(content) && !showLeadForm && !leadSubmitted) {
        setShowLeadForm(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sem ligação. Tenta novamente ou contacta-nos via WhatsApp." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name.trim() || !leadForm.email.trim()) return;

    trackGA4("chatbot_lead", { lead_email: leadForm.email });
    setLeadSubmitted(true);
    setShowLeadForm(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Obrigado, ${leadForm.name.split(" ")[0]}! O Daniel vai entrar em contacto brevemente.`,
      },
    ]);

    // Post to contact route (fire-and-forget)
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: leadForm.name,
        email: leadForm.email,
        message: "Lead capturado via chatbot",
        source: "chatbot",
      }),
    }).catch(() => {});
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleOpen}
            aria-label="Abrir chat"
            className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0E3A45] shadow-lg transition-transform hover:scale-110 active:scale-95"
            style={{ display: open ? "none" : "flex" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl
                       w-[calc(100vw-24px)] max-w-[350px]
                       sm:w-[350px]
                       max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-b-none"
            style={{ height: "500px" }}
            onPointerMove={resetInactivity}
            onKeyDown={resetInactivity}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#0E3A45] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FA8334]">
                  <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Beyond Focus</p>
                  <p className="text-xs text-white/60">Assistente virtual</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar chat"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F5F5F5]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#0E3A45] text-white rounded-br-sm"
                        : "bg-white text-[#0E3A45] shadow-sm rounded-bl-sm"
                    }`}
                  >
                    {msg.content || (msg.role === "assistant" && loading ? "" : msg.content)}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-sm shadow-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {/* Lead capture form */}
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#0E3A45]/10"
                >
                  <p className="text-sm font-semibold text-[#0E3A45] mb-3">
                    Preparamos um orçamento personalizado:
                  </p>
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <input
                      type="text"
                      placeholder="O teu nome"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0E3A45] placeholder:text-gray-400 focus:border-[#FA8334] focus:outline-none"
                      required
                    />
                    <input
                      type="email"
                      placeholder="O teu email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0E3A45] placeholder:text-gray-400 focus:border-[#FA8334] focus:outline-none"
                      required
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 rounded-lg bg-[#FA8334] py-2 text-sm font-semibold text-white hover:bg-[#e6722a] transition-colors"
                      >
                        Enviar
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLeadForm(false)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Agora não
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 bg-white px-3 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escreve uma mensagem..."
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm text-[#0E3A45] placeholder:text-gray-400 focus:border-[#0E3A45] focus:outline-none"
                  maxLength={500}
                  disabled={loading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  aria-label="Enviar mensagem"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#0E3A45] text-white transition-opacity disabled:opacity-40 hover:bg-[#0c2f38]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>

              {/* WhatsApp fallback */}
              <p className="mt-2 text-center text-xs text-gray-400">
                Preferes falar directamente?{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
