"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView, motion, useScroll, useTransform } from "framer-motion";
import Reveal, { SplitWords } from "@/components/shared/Reveal";
import Blocks from "@/components/shared/Blocks";
import AccountGate from "@/components/shared/AccountGate";
import SceneBoundary from "@/components/shared/SceneBoundary";
import { Arrow } from "@/components/shared/Icons";
import { company, isLicensed } from "@/lib/site";
import { pages, homeHighlights } from "@/lib/content";
import { NavPanel } from "./Shell";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export const skin = {
  text: "mb-6 max-w-3xl text-lg leading-relaxed text-white/70",
  notice: "mb-6 border-l-2 border-gold-400 bg-ink-800 p-5 text-sm leading-relaxed text-white/80",
  kv: "mb-6 border-t border-ink-600",
  kvRow: "grid gap-1 border-b border-ink-600 py-4 sm:grid-cols-[240px_1fr] sm:gap-6",
  kvK: "text-sm text-white/45",
  kvV: "text-base",
  cards: "mb-6 grid gap-3 sm:grid-cols-2",
  card: "h-full rounded-2xl bg-ink-700 p-6 transition-colors hover:bg-ink-600/80",
  cardT: "mb-2 text-xl font-bold",
  cardP: "text-sm leading-relaxed text-white/55",
  tableWrap: "mb-6 overflow-x-auto border-t border-ink-600",
  th: "py-4 pr-6 text-xs font-medium uppercase tracking-widest text-white/40 border-b border-ink-600",
  tr: "border-b border-ink-600",
  td: "py-4 pr-6 text-white/85",
  faqWrap: "border-t border-ink-600",
  faqItem: "border-b border-ink-600",
  faqQ: "flex w-full items-center justify-between gap-4 py-6 text-left text-lg font-medium",
  faqA: "pb-6 text-white/55",
  steps: "border-t border-ink-600",
  step: "flex gap-6 border-b border-ink-600 py-5 text-white/80",
  stepN: "font-bold text-gold-300",
  panel: "rounded-3xl bg-ink-800 p-8",
  btn: "inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black",
  link: "text-sm underline underline-offset-4",
  label: "grid gap-2 text-sm text-white/50",
  input: "rounded-xl border border-ink-600 bg-black px-4 py-3 text-white placeholder-white/25",
};

function ScrollText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="flex flex-wrap text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
      {words.map((w, i) => {
        const start = i / words.length;
        return <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>{w}</Word>;
      })}
    </p>
  );
}
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em]">{children}</motion.span>;
}

export function Home({ base }) {
  const hero = useRef(null);
  const heroVisible = useInView(hero, { margin: "100px" });
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <section ref={hero} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div className="absolute inset-0"><SceneBoundary fallback={null}><Scene paused={!heroVisible} /></SceneBoundary></div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
        <motion.div style={{ y, opacity: fade }} className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-16 sm:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-6 inline-flex w-fit flex-wrap items-center gap-3 rounded-full bg-black/70 px-4 py-2 text-sm text-white/75 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold-300" />
            {isLicensed ? "Licensed by the UAE Capital Market Authority" : "CMA licence application in progress · No regulated services offered yet"}
          </motion.div>
          <h1 className="text-[19vw] font-bold leading-[0.82] tracking-tighter sm:text-[16vw] lg:text-[14rem]">
            <SplitWords text="GTCFC" stagger={0} />
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="max-w-md text-lg text-white/70">
              {company.legalName}. Forex and OTC derivatives for the United Arab Emirates.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <Link href={`${base}/regulation`} className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">
                Regulation <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8">
        <Reveal className="mb-8 flex items-end justify-between border-b border-ink-600 pb-6">
          <span className="text-3xl font-bold">GTCFC</span>
          <span className="rounded-full bg-ink-700 px-4 py-1.5 text-sm">Website Navigation</span>
        </Reveal>
        <Reveal><NavPanel base={base} animate={false} /></Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8">
        <div className="mb-10 text-sm uppercase tracking-[0.3em] text-white/40">Our approach</div>
        <ScrollText text="We are building a broker for the UAE the right way — licensed by the Capital Market Authority, with client money segregated, clear disclosures and nothing offered before approval." />
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-2 border-t border-ink-600 px-4 sm:px-8 lg:grid-cols-4">
        {homeHighlights.map((h, i) => (
          <Reveal key={h.k} delay={i * 0.08} className="border-b border-ink-600 py-10 pr-4 lg:border-b-0">
            <div className="text-sm text-white/40">{String(i + 1).padStart(2, "0")} — {h.k}</div>
            <div className="mt-3 text-2xl font-bold sm:text-3xl">{h.v}</div>
          </Reveal>
        ))}
      </section>
    </>
  );
}

function PageHero({ title, intro }) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-12 pt-36 sm:px-8">
      <h1 className="text-[15vw] font-bold leading-[0.85] tracking-tighter sm:text-[10vw] lg:text-[9rem]"><SplitWords text={title} /></h1>
      {intro && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 max-w-xl border-t border-ink-600 pt-6 text-lg text-white/60">{intro}</motion.p>}
    </section>
  );
}

export function ContentPage({ slug }) {
  const p = pages[slug];
  return (
    <>
      <PageHero title={p.title} intro={p.intro} />
      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8">
        {p.banner && <Reveal><div className={skin.notice}>{p.banner}</div></Reveal>}
        {p.sections.map((s, i) => (
          <section key={s.id} id={s.id} className="grid gap-8 border-t border-ink-600 py-14 lg:grid-cols-[320px_1fr]">
            <div>
              <div className="lg:sticky lg:top-28">
                <div className="text-sm text-white/40">{String(i + 1).padStart(2, "0")}</div>
                <h2 className="mt-2 text-4xl font-bold tracking-tight">{s.title}</h2>
              </div>
            </div>
            <div><Blocks blocks={s.blocks} s={skin} /></div>
          </section>
        ))}
      </div>
    </>
  );
}

export function AccountPage({ kind, title }) {
  return (
    <>
      <PageHero title={title} />
      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8"><div className="max-w-2xl"><AccountGate kind={kind} s={skin} /></div></div>
    </>
  );
}

export function ComingSoon() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black font-display text-white">
      <div className="absolute inset-0"><SceneBoundary fallback={null}><Scene /></SceneBoundary></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black/80" />
      <div className="relative flex items-center justify-between px-4 py-6 sm:px-8">
        <span className="text-2xl font-bold tracking-tight">GTCFC</span>
        <span className="rounded-full bg-ink-700/80 px-4 py-1.5 text-xs backdrop-blur">{company.legalName}</span>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="text-[17vw] font-bold leading-[0.85] tracking-tighter sm:text-[12vw]">
          <SplitWords text="COMING" stagger={0} />
          <br />
          <SplitWords text="SOON" delay={0.15} wordClassName="text-gold-sheen" />
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 text-lg text-white/70 sm:text-xl">Our website is under construction.</motion.p>
      </div>
      <div className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 px-4 py-6 text-sm sm:flex-row sm:px-8">
        <span className="text-2xl font-bold">{company.domain}</span>
        <a href={`mailto:${company.email}`} className="underline underline-offset-4">{company.email}</a>
        <span className="text-xs text-white/40">This website does not offer any financial products or services.</span>
      </div>
    </main>
  );
}
