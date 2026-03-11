"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getAnchorForScore, getScoreLabel, quadrants, questions } from "@/lib/scan-config";
import { encodeAnswersToV } from "@/lib/report-url";
import { uitlegCopy } from "@/lib/copy";
import Logo from "@/components/Logo";

type Step = "welcome" | "questions" | "lead";

type Lead = {
  name: string;
  email: string;
};

/* Bureautje Aap huisstijl */
const kwadrantKleuren: Record<string, string> = {
  lef: "#2D7A3A",
  werkwijze: "#1A4D2E",
  individu: "#7BC47F",
  doel: "#111111",
};
const accent = "#C8F5C8";
const accentHover = "#2D7A3A";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array.from({ length: questions.length }, () => 5));
  const [lead, setLead] = useState<Lead>({ name: "", email: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const currentScore = answers[currentQuestionIndex];
  const currentScoreLabel = getScoreLabel(currentScore);
  const currentAnchor = getAnchorForScore(currentScore, currentQuestion.anchors);
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setStep("lead");
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingLead(true);
    const v = encodeAnswersToV(answers);
    const n = encodeURIComponent(lead.name);
    const e = encodeURIComponent(lead.email);

    setIsSubmittingLead(false);
    router.push(`/rapport?v=${v}&n=${n}&e=${e}`);
  };

  const handleSkipLead = () => {
    const v = encodeAnswersToV(answers);
    const n = encodeURIComponent(lead.name);
    router.push(`/rapport?v=${v}&n=${n}&skip=1`);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <header className="sticky top-0 z-50 bg-[#111111] border-b border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          <div className="text-[0.9rem] text-white/80 font-body" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>AI Adoptie Profiel — de WILD-scan</div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-5 mt-6 mb-8 sm:p-8" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
        {step === "welcome" && (
          <section className="space-y-6">
            <h1 className="text-white leading-tight" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
              AI Adoptie Profiel
            </h1>
            <p className="text-[#C8F5C8] text-[1.25rem] tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>
              De WILD-scan
            </p>
            <p className="text-white text-base max-w-[600px] mx-auto text-center leading-relaxed" style={{ fontFamily: "var(--font-body), Inter, sans-serif", lineHeight: 1.6 }}>
              Deze WILD-scan is een korte momentopname van de afgelopen periode. Er zijn geen goede of
              foute antwoorden: je ontdekt waar jullie AI-adoptie al sterk is en waar groeikansen liggen.
            </p>
            <ul className="space-y-2 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] p-4 text-sm text-white/90">
              <li>12 vragen verdeeld over 4 kwadranten</li>
              <li>Slider van 1 tot 10 met duidelijke betekenis per score</li>
              <li>Direct een visueel resultaat met persoonlijk feedbacksignaal</li>
            </ul>
            <button
              type="button"
              onClick={() => setStep("questions")}
              className="inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition focus:outline-none focus-visible:ring-2 hover:bg-[#2D7A3A] hover:text-white"
              style={{ background: accent, color: "#111111", fontFamily: "var(--font-body), Inter, sans-serif" }}
            >
              Start de scan
            </button>

            <details className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-4">
              <summary className="cursor-pointer text-sm font-semibold" style={{ color: accent }}>
                {uitlegCopy.titel}
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-sm leading-relaxed text-white/80">{uitlegCopy.toelichting}</p>
                <Image
                  src={uitlegCopy.graphicPad}
                  alt="Visual van het WILD-model"
                  width={1200}
                  height={700}
                  className="h-auto w-full rounded-lg object-contain"
                />
              </div>
            </details>
          </section>
        )}

        {step === "questions" && (
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>
                  Vraag {currentQuestionIndex + 1} van {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-[6px] rounded-full bg-[#1A4D2E] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35 }}
                  style={{ background: accent }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="space-y-3">
                  <span
                    className="inline-flex rounded-full px-4 py-1 text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white"
                    style={{ background: kwadrantKleuren[currentQuestion.quadrantId] ?? "#2D7A3A", fontFamily: "var(--font-body), Inter, sans-serif" }}
                  >
                    {currentQuestion.id} · {quadrants.find((item) => item.id === currentQuestion.quadrantId)?.name}
                  </span>
                  <h2 className="text-white text-[1.4rem]" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>{currentQuestion.title}</h2>
                  <p className="leading-relaxed text-[#C8F5C8] text-[0.95rem] italic" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>{currentQuestion.prompt}</p>
                </div>

                <div className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-4 sm:p-5">
                  <label htmlFor="score" className="mb-3 block text-sm font-medium text-white">
                    Jouw score: <span className="font-semibold" style={{ color: accent }}>{currentScore}</span>
                  </label>
                  <input
                    id="score"
                    type="range"
                    min={1}
                    max={10}
                    value={currentScore}
                    onChange={(event) => {
                      const newValue = Number(event.target.value);
                      setAnswers((prev) => prev.map((score, index) => (index === currentQuestionIndex ? newValue : score)));
                    }}
                    className="h-4 w-full cursor-pointer"
                    style={{ ["--kwadrant-thumb" as string]: kwadrantKleuren[currentQuestion.quadrantId] ?? accent } as React.CSSProperties}
                  />
                  <div className="mt-4 rounded-xl border border-[#2A2A2A] p-3 bg-[#111111]">
                    <p className="text-sm font-semibold text-white">
                      Betekenis
                    </p>
                    <p className="mt-1 text-sm text-[#C8F5C8]">
                      {currentScoreLabel} · {currentAnchor.text}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[0.8rem]" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>
                    {currentQuestion.anchors.map((a) => {
                      const isActive = currentAnchor.key === a.key;
                      return (
                        <span
                          key={a.key}
                          className={isActive ? "font-semibold" : ""}
                          style={{ color: isActive ? accent : "#888888" }}
                        >
                          {a.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border-2 px-5 py-3 text-sm font-semibold transition hover:bg-[#C8F5C8] hover:text-[#111111] disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ background: "transparent", borderColor: accent, color: accent, fontFamily: "var(--font-body), Inter, sans-serif" }}
                  >
                    Vorige
                  </button>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition hover:bg-[#2D7A3A] hover:text-white"
                    style={{ background: accent, color: "#111111", fontFamily: "var(--font-body), Inter, sans-serif" }}
                  >
                    {currentQuestionIndex === questions.length - 1 ? "Naar je resultaat" : "Volgende"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        )}

        {step === "lead" && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}>Ontvang je resultaten en uitgebreide rapport</h2>
            <p className="text-white/90" style={{ fontFamily: "var(--font-body), Inter, sans-serif", lineHeight: 1.6 }}>
              Vul je naam en e-mailadres in. Dan kun je direct door naar je WILD-resultaat en is de
              e-mailafhandeling voorbereid voor verzending.
            </p>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>
                  Naam
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={lead.name}
                  onChange={(event) => setLead((prev) => ({ ...prev, name: event.target.value }))}
                  className="min-h-12 w-full rounded-lg border border-[#2A2A2A] bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-[#C8F5C8] focus:ring-2 focus:ring-[#C8F5C8]/30"
                  placeholder="Jouw naam"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white" style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}>
                  E-mailadres
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={lead.email}
                  onChange={(event) => setLead((prev) => ({ ...prev, email: event.target.value }))}
                  className="min-h-12 w-full rounded-lg border border-[#2A2A2A] bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-[#C8F5C8] focus:ring-2 focus:ring-[#C8F5C8]/30"
                  placeholder="naam@bedrijf.nl"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition hover:bg-[#2D7A3A] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: accent, color: "#111111", fontFamily: "var(--font-body), Inter, sans-serif" }}
              >
                {isSubmittingLead ? "Bezig met verwerken..." : "Verstuur"}
              </button>
              <button
                type="button"
                onClick={handleSkipLead}
                className="block text-sm text-[#C8F5C8] underline underline-offset-2 hover:text-white transition"
                style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}
              >
                Sla over en bekijk direct je resultaat
              </button>
            </form>
          </section>
        )}

      </main>
    </div>
  );
}
