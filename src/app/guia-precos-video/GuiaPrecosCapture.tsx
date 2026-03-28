"use client";

import { BlogEmailCapture } from "@/components/features/blog/BlogEmailCapture";

interface GuiaPrecosCaptureProps {
  variant?: "inline" | "banner";
  title?: string;
  description?: string;
  ctaLabel?: string;
  source?: string;
  magnet?: string;
}

export function GuiaPrecosCapture(props: GuiaPrecosCaptureProps) {
  const handleSuccess = () => {
    if (typeof window !== "undefined" && typeof (window as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
      (window as { gtag?: (...args: unknown[]) => void }).gtag!("event", "guide_download", {
        event_category: "lead",
        event_label: "guia_precos",
      });
    }
  };

  return <BlogEmailCapture {...props} onSuccess={handleSuccess} />;
}
