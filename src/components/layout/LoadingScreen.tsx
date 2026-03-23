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

    // Speed up video 2x
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }

    // Safety timeout — max 2s
    const safetyTimeout = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("bf-loaded", "true");
    }, 2000);

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
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
      )}
    </AnimatePresence>
  );
}
