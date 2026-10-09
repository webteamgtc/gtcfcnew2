"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import Reveal, { SplitWords } from "@/components/shared/Reveal";
import Blocks from "@/components/shared/Blocks";
import AccountGate from "@/components/shared/AccountGate";
import SceneBoundary from "@/components/shared/SceneBoundary";
import useActiveSection from "@/components/shared/useActiveSection";
import { UserPlus, LogIn, Arrow } from "@/components/shared/Icons";
import { company, getNav, isLicensed } from "@/lib/site";
import { pages, homeHighlights } from "@/lib/content";
import { Aurora } from "./Shell";

const Scene = dynamic(() => import("./Scene"), { ssr: false });
const Fallback = <div className="h-full w-full bg-[radial-gradient(circle,rgba(201,163,91,0.25)_0%,transparent_60%)]" />;

const glass = "rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl";

export const skin = {
  text: "mb-6 max-w-3xl text-[17px] leading-relaxed text-white/70",
  notice: "mb-6 rounded-2xl border border-gold-300/30 bg-gradient-to-r from-gold-500/15 to-transparent p-5 text-sm leading-relaxed text-gold-100",
  kv: "mb-6 grid gap-3 sm:grid-cols-2",
  kvRow: `${glass} rounded-2xl px-5 py-4`,
  kvK: "text-xs uppercase tracking-wider text-white/45",
  kvV: "mt-1 text-[15px] font-medium",
  cards: "mb-6 grid gap-4 sm:grid-cols-2",
  card: `${glass} h-full p-6 transition-colors hover:bg-white/[0.07]`,
  cardT: "mb-2 text-xl font-semibold tracking-tight",
  cardP: "text-sm leading-relaxed text-white/60",
  tableWrap: `${glass} mb-6 overflow-x-auto`,
  th: "px-6 py-4 text-xs font-medium uppercase tracking-wider text-white/45 border-b border-white/10",
  tr: "border-b border-white/5 last:border-0",
  td: "px-6 py-4 text-white/80",
  faqWrap: "space-y-3",
  faqItem: `${glass} rounded-2xl`,
  faqQ: "flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium",
  faqA: "px-6 pb-5 text-sm leading-relaxed text-white/60",
  steps: "relative space-y-4 border-l border-white/15 pl-8",
  step: "relative flex flex-col gap-1 text-white/80",
  stepN: "absolute -left-[46px] grid h-7 w-7 place-items-center rounded-full border border-gold-300/50 bg-[#0a1024] text-[11px] text-gold-200",
  panel: `${glass} p-8`,
  btn: "inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a1024]",
  link: "text-sm text-gold-200 hover:text-white",
  label: "grid gap-2 text-sm text-white/60",
  input: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30",
};

const INSTRUMENTS = ["EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD", "XAG/USD", "AUD/USD", "USD/CHF", "US30", "NAS100", "GER40", "UK100", "USOIL", "USD/CAD", "NZD/USD"];

function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {[...INSTRUMENTS, ...INSTRUMENTS].map((s, i) => (
          <span key={i} className="flex items-center gap-12 text-sm font-medium tracking-widest text-white/40">
            {s}<span className="h-1 w-1 rounded-full bg-gold-400/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Roadmap() {
  const steps = [
    { t: "Company established", d: `${company.legalName} incorporated in Dubai`, s: "done" },
    { t: "CMA application", d: "Category 1 licence application with the UAE CMA", s: "now" },
    { t: "Licence approval", d: "Licence granted and published on this website", s: "next" },
    { t: "Client launch", d: "Account opening and trading platforms go live", s: "next" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {steps.map((st, i) => (
        <Reveal key={st.t} delay={i * 0.1}>
          <div className={`${glass} relative h-full overflow-hidden p-6 ${st.s === "now" ? "border-gold-300/40" : ""}`}>
            {st.s === "now" && <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-white/10"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="h-full w-1/2 bg-gradient-to-r from-transparent via-gold-300 to-transparent" /></div>}
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">Step {i + 1}</span>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${st.s === "done" ? "bg-emerald-400/15 text-emerald-300" : st.s === "now" ? "bg-gold-400/15 text-gold-200" : "bg-white/5 text-white/40"}`}>
                {st.s === "done" ? "Done" : st.s === "now" ? "In progress" : "Upcoming"}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold">{st.t}</h3>
            <p className="mt-1 text-sm text-white/55">{st.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Bento({ base }) {
  const nav = getNav(base);
  return (
    <div className={`${glass} rounded-[36px] p-4 sm:p-6`}>
      <div className="mb-4 flex items-center justify-between px-2">
        <span className="text-2xl font-semibold tracking-tight">GTCFC</span>
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs">Website Navigation</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {nav.map((n, i) => (
          <Reveal key={n.href} delay={i * 0.06}>
            <motion.div whileHover={{ scale: 1.015 }} className="group h-full rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6">
              <Link href={n.href} className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{n.title}</h3>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition group-hover:rotate-[-45deg] group-hover:bg-gold-300 group-hover:text-[#0a1024]"><Arrow className="h-4 w-4" /></span>
              </Link>
              <p className="mt-3 text-sm text-white/55">
                {n.items.map((it, j) => <span key={it.href}>{j > 0 && " · "}<Link href={it.href} className="hover:text-white">{it.label}</Link></span>)}
              </p>
            </motion.div>
          </Reveal>
        ))}
        {[{ l: "Open an Account", h: `${base}/open-account`, I: UserPlus }, { l: "Client Login", h: `${base}/login`, I: LogIn }].map(({ l, h, I }) => (
          <motion.div key={h} whileHover={{ y: -3 }}>
            <Link href={h} className="flex flex-col items-center gap-2 rounded-3xl border border-white/10 py-8 text-center hover:border-gold-300/50">
              <I className="h-7 w-7 text-gold-200" />
              <span className="font-semibold">{l}</span>
              {!isLicensed && <span className="text-xs text-white/40">Available once licensed</span>}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Home({ base }) {
  const heroRef = useRef(null);
  const heroVisible = useInView(heroRef, { margin: "100px" });
  return (
    <>
      <section ref={heroRef} className="relative mx-auto -mt-32 flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pt-32 text-center">
        <div className="absolute inset-0 -z-0 opacity-40 sm:opacity-75">
          <SceneBoundary fallback={Fallback}><Scene scale={0.9} paused={!heroVisible} /></SceneBoundary>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,10,26,0.8)_0%,rgba(6,10,26,0.35)_45%,transparent_70%)]" />
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${glass} mx-auto mb-8 inline-flex rounded-full px-4 py-1.5 text-xs text-white/70`}>
            Dubai · United Arab Emirates
          </motion.div>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            <SplitWords text="Trade the world" />
            <br />
            <SplitWords text="from the UAE." delay={0.2} wordClassName="bg-gradient-to-r from-white via-gold-200 to-gold-400 bg-clip-text text-transparent" />
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mx-auto mt-6 max-w-xl text-lg text-white/65">
            Forex and OTC derivatives for clients in the United Arab Emirates — being built under the UAE Capital Market Authority framework.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={`${base}/regulation`} className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0a1024] hover:bg-gold-200">Regulatory status</Link>
            <Link href={`${base}/markets`} className={`${glass} rounded-full px-7 py-3.5 text-sm hover:bg-white/10`}>Explore markets</Link>
          </motion.div>
        </div>
      </section>

      <Marquee />

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal className="mb-10">
          <div className="text-sm text-gold-200">Path to launch</div>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Built the right way.</h2>
        </Reveal>
        <Roadmap />
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <Reveal>
          <div className="text-sm text-gold-200">Explore</div>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Everything in one place.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {homeHighlights.map((h) => (
              <div key={h.k} className={`${glass} rounded-2xl p-4`}>
                <div className="text-xs text-white/45">{h.k}</div>
                <div className="mt-1 font-semibold">{h.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Bento base={base} />
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, intro, sections, active }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gold-200">{eyebrow}</motion.div>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-7xl"><SplitWords text={title} /></h1>
      {intro && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mx-auto mt-5 max-w-xl text-lg text-white/60">{intro}</motion.p>}
      {sections && (
        <div className="sticky top-28 z-20 mt-10 flex justify-center">
          <div className={`${glass} inline-flex gap-1 rounded-full p-1.5`}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={`relative rounded-full px-5 py-2 text-sm ${active === s.id ? "text-[#0a1024]" : "text-white/70"}`}>
                {active === s.id && <motion.span layoutId="hz-tab" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function ContentPage({ slug }) {
  const p = pages[slug];
  const active = useActiveSection(p.sections.map((s) => s.id));
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} sections={p.sections} active={active} />
      <div className="mx-auto max-w-5xl space-y-6 px-4 pb-24">
        {p.banner && <Reveal><div className={skin.notice}>{p.banner}</div></Reveal>}
        {p.sections.map((s) => (
          <section key={s.id} id={s.id} className={`${glass} rounded-[32px] p-6 sm:p-10`}>
            <Reveal><h2 className="mb-6 text-3xl font-semibold tracking-tight">{s.title}</h2></Reveal>
            <Blocks blocks={s.blocks} s={skin} />
          </section>
        ))}
      </div>
    </>
  );
}

export function AccountPage({ kind, title }) {
  return (
    <>
      <PageHero eyebrow={kind === "login" ? "Client area" : "Get started"} title={title} />
      <div className="mx-auto max-w-2xl px-4 pb-24"><AccountGate kind={kind} s={skin} /></div>
    </>
  );
}

export function ComingSoon() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#060a1a] px-4 py-16 text-center">
      <Aurora />
      <div className="absolute inset-0">
        <SceneBoundary fallback={Fallback}><Scene scale={0.85} /></SceneBoundary>
      </div>
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className={`${glass} relative z-10 w-full max-w-xl rounded-[36px] p-8 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.7)] sm:p-12`}>
        <div className="text-sm tracking-wide text-white/70">{company.legalName}</div>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
          <SplitWords text="Coming" delay={0.3} />
          <SplitWords text="soon" delay={0.4} wordClassName="bg-gradient-to-r from-gold-200 to-gold-500 bg-clip-text text-transparent" />
        </h1>
        <p className="mt-4 text-white/60">Our website is under construction.</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
          <div className="flex justify-between text-xs text-white/50"><span>CMA licence application</span><span className="text-gold-200">In progress</span></div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div initial={{ width: 0 }} animate={{ width: "55%" }} transition={{ delay: 0.8, duration: 1.6, ease: "easeOut" }} className="relative h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-200">
              <motion.span animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity }} className="absolute inset-y-0 w-1/3 bg-white/50 blur-sm" />
            </motion.div>
          </div>
        </div>
        <div className="mt-8 text-4xl font-semibold tracking-tight text-gold-200">{company.domain}</div>
        <a href={`mailto:${company.email}`} className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a1024] hover:bg-gold-200">{company.email}</a>
      </motion.div>
      <p className="relative z-10 mt-8 text-[11px] text-white/40">This website does not offer any financial products or services.</p>
    </main>
  );
}
