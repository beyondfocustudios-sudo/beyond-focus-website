"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);

    // Skip if already shown this session
    if (typeof window !== "undefined" && sessionStorage.getItem("bf-loaded")) {
      setShow(false);
      return;
    }

    // Safety timeout — max 4s
    const timeout = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("bf-loaded", "true");
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const handleVideoEnd = () => {
    setShow(false);
    sessionStorage.setItem("bf-loaded", "true");
  };

  // Don't render anything on server
  if (!mounted) return null;

  // Already loaded this session
  if (!show && !mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FAF9F7]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <video
            ref={videoRef}
            src="/videos/loading.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="h-auto w-auto max-h-[200px] max-w-[200px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
