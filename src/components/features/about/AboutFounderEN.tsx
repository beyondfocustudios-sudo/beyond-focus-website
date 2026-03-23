"use client";

import { motion } from "framer-motion";

export function AboutFounderEN() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Photo placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl bg-petrol/5"
          style={{ aspectRatio: "3/4" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-petrol/10">
                <span className="text-2xl font-bold text-petrol/30">DL</span>
              </div>
              <p className="mt-4 text-sm font-medium text-petrol/30">Daniel Lopes</p>
              <p className="text-xs text-petrol/20">Founder & Creative Director</p>
            </div>
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            The story behind the camera
          </p>
          <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
            Daniel Lopes
          </h2>
          <p className="mt-1 text-base font-medium text-petrol/40">Founder & Creative Director</p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-petrol/60">
            <p>
              The passion for audiovisual didn&apos;t start in a classroom — it started in a living room, watching films. While most people watched series, I spent hours watching cinema. When my mother gave me my first camera, what was curiosity became direction.
            </p>
            <p>
              I studied Multimedia at ISEC in Lisbon. I learned the basics, but what really shaped me was autonomous work — hours filming, editing, failing and repeating. I finished university, did my internship, and in 2023, at 20 years old, I founded Beyond Focus.
            </p>
            <p>
              The first two years were not easy. There were many highs, but also many lows. The difference is that the lows never stopped us — they reminded us why we started. Every &ldquo;no&rdquo; we heard was one step closer to the &ldquo;yes&rdquo; that changed everything.
            </p>
            <p>
              Today, the goal is clear: when someone in Portugal thinks of high-quality video with real results, I want them to think of Beyond Focus. Not because we are the biggest — but because we treat every project as if it were the only one.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Philosophy block */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 rounded-2xl bg-petrol p-10 lg:p-16"
      >
        <h3 className="text-[clamp(24px,2.5vw,36px)] font-bold text-white">
          99 nos to get to yes.
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
          If you knew you needed to hear 99 &ldquo;nos&rdquo; to reach your first &ldquo;yes&rdquo; — wouldn&apos;t you want to hear each &ldquo;no&rdquo; as fast as possible? This way of thinking defines how we face every challenge. Every rejection is a step. Every obstacle is progress. And when the &ldquo;yes&rdquo; comes, we know exactly what it&apos;s worth.
        </p>
      </motion.div>
    </section>
  );
}
