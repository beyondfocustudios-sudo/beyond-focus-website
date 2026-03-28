"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined" && sessionStorage.getItem("bf-loaded")) {
      setShow(false);
      return;
    }

    // Video plays at normal speed (1x) so the logo is fully visible

    const safetyTimeout = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("bf-loaded", "true");
    }, 1200);

    // Video load check — if not playing after 1s, skip
    const videoCheck = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 2) {
        setShow(false);
        sessionStorage.setItem("bf-loaded", "true");
      }
    }, 1000);

    return () => {
      clearTimeout(safetyTimeout);
      clearTimeout(videoCheck);
    };
  }, []);

  const handleVideoEnd = () => {
    setShow(false);
    sessionStorage.setItem("bf-loaded", "true");
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FAF9F7]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0 }}
          >
            <video
              ref={videoRef}
              src="/videos/loading.mp4"
              poster="/images/loading-poster.png"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="h-[30vh] w-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
