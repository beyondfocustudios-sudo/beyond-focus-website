"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";

const SERVICES = ["Commercial Films", "Corporate Videos", "Documentaries", "Social Media", "Photography", "Events", "Strategy"];
const BUDGETS = ["Not sure yet", "< €2,000", "€2,000 - €5,000", "€5,000 - €10,000", "> €10,000"];

export default function EnContactPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", website: "", services: [] as string[], message: "", budget: "", startDate: "" });

  const update = (f: string, v: string) => setForm((s) => ({ ...s, [f]: v }));
  const toggle = (s: string) => setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));
  const canNext = step === 1 ? form.name && form.email && form.phone : step === 2 ? form.services.length > 0 : true;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) setSubmitted(true);
    } catch { /* */ }
    setLoading(false);
  };

  if (submitted) {
    return (
      <>
        <Navbar variant="light" locale="en" />
        <main className="flex min-h-[80vh] items-center justify-center bg-bg-light">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-petrol">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-petrol">Message sent!</h2>
            <p className="mt-3 text-petrol/50">We&apos;ll get back to you within 24 hours.</p>
            <Link href="/en" className="mt-6 inline-block text-sm text-petrol underline hover:text-orange">Back to homepage →</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar variant="light" locale="en" />
      <main className="bg-bg-light">
        <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 pt-[160px] pb-20 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:px-12">
          <div>
            <span className="font-mono text-[11px] font-medium tracking-[3px] uppercase text-orange">Contact</span>
            <h1 className="mt-3 text-[clamp(36px,4vw,56px)] font-bold leading-[1.08] text-petrol">Get in touch.</h1>
            <p className="mt-4 max-w-md text-base text-petrol/50">Tell us about your project. The first conversation is on us.</p>
            <div className="mt-10 space-y-4 text-sm text-petrol/50">
              <p><strong className="text-petrol">Email:</strong> geral@beyondfocus.pt</p>
              <p><strong className="text-petrol">Phone:</strong> +351 937 350 178</p>
              <p><strong className="text-petrol">Location:</strong> Lisbon, Portugal</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm lg:p-10">
            <div className="mb-8 flex gap-2">{[1,2,3].map(s => <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? "bg-orange" : "bg-petrol/10"}`} />)}</div>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <h3 className="text-2xl font-bold text-petrol">Tell us about you.</h3>
                  <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your name *" className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-petrol outline-none focus:border-orange" />
                  <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="Email *" className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-petrol outline-none focus:border-orange" />
                  <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="Phone *" className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-petrol outline-none focus:border-orange" />
                  <input value={form.company} onChange={e => update("company", e.target.value)} placeholder="Company" className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-petrol outline-none focus:border-orange" />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <h3 className="text-2xl font-bold text-petrol">What are you looking for?</h3>
                  <div className="flex flex-wrap gap-3">
                    {SERVICES.map(s => <button key={s} onClick={() => toggle(s)} className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${form.services.includes(s) ? "border-orange bg-orange/10 text-petrol" : "border-petrol/15 text-petrol/50"}`}>{s}</button>)}
                  </div>
                  <textarea value={form.message} onChange={e => update("message", e.target.value)} rows={3} placeholder="Tell us about your project" className="w-full resize-none border-b-2 border-petrol/10 bg-transparent py-3 text-petrol outline-none focus:border-orange" />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <h3 className="text-2xl font-bold text-petrol">Last details.</h3>
                  <div className="flex flex-wrap gap-3">
                    {BUDGETS.map(b => <button key={b} onClick={() => update("budget", b)} className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${form.budget === b ? "border-orange bg-orange/10 text-petrol" : "border-petrol/15 text-petrol/50"}`}>{b}</button>)}
                  </div>
                  <input value={form.startDate} onChange={e => update("startDate", e.target.value)} placeholder="Ideal start date" className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-petrol outline-none focus:border-orange" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-10 flex items-center justify-between">
              {step > 1 ? <button onClick={() => setStep(step - 1)} className="text-sm text-petrol/50 hover:text-petrol">← Back</button> : <div />}
              {step < 3 ? (
                <button onClick={() => canNext && setStep(step + 1)} className={`rounded-full px-8 py-3 text-sm font-semibold ${canNext ? "bg-petrol text-white" : "bg-petrol/20 text-petrol/30 cursor-not-allowed"}`}>Next →</button>
              ) : (
                <button onClick={handleSubmit} disabled={loading} className="rounded-full bg-orange px-8 py-3 text-sm font-semibold text-white hover:bg-orange/90">{loading ? "Sending..." : "Send message"}</button>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
