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
    const safetyTimeout = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("bf-loaded", "true");
    }, 4000);

    // Video load check — if not playing after 2s, skip
    const videoCheck = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 2) {
        setShow(false);
        sessionStorage.setItem("bf-loaded", "true");
      }
    }, 2000);

    return () => {
      clearTimeout(safetyTimeout);
      clearTimeout(videoCheck);
    };
  }, []);

  const handleVideoEnd = () => {
    setShow(false);
    sessionStorage.setItem("bf-loaded", "true");
  };

  // Don't render anything on server
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FAF9F7]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <video
            ref={videoRef}
            src="/videos/loading.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-[20vw] max-w-[320px] min-w-[180px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
