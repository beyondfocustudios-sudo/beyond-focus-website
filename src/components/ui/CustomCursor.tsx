"use client";

import { useEffect, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";

type CursorState = "default" | "link" | "hover-link" | "gallery";

export function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Responsive spring — near-instant with slight ease
  const springX = useSpring(mouseX, { stiffness: 500, damping: 30, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30, mass: 0.2 });

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('[data-cursor="hover-link"]')) {
      setState("hover-link");
    } else if (target.closest('[data-cursor="gallery"]')) {
      setState("gallery");
    } else if (
      target.closest("a, button, input, select, textarea, [role=\"button\"]")
    ) {
      setState("link");
    } else {
      setState("default");
    }
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (
      !relatedTarget ||
      !relatedTarget.closest("a, button, input, select, textarea, [role=\"button\"], [data-cursor]")
    ) {
      setState("default");
    }
  }, []);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("resize", checkDesktop);
    };
  }, [mouseX, mouseY, handleMouseOver, handleMouseOut]);

  if (!isDesktop) return null;

  const size = state === "default" ? 16 : state === "link" ? 40 : 48;
  const showBg = state !== "link";

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: size,
        height: size,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        width: { duration: 0.3, ease: "easeInOut" },
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.1 },
      }}
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference ${
        showBg ? "bg-white" : "border border-white"
      }`}
    >
      <AnimatePresence>
        {state === "hover-link" && (
          <motion.span
            key="arrow"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="text-[#0E3A45] text-sm font-bold"
          >
            ↗
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state === "gallery" && (
          <motion.span
            key="drag"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="text-[#0E3A45] text-sm font-bold"
          >
            ↔
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
