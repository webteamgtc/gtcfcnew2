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
import { UserPlus, LogIn, Arrow, Shield, Globe, Scale } from "@/components/shared/Icons";
import { company, getNav, isLicensed } from "@/lib/site";
import { pages, homeHighlights } from "@/lib/content";

const Scene = dynamic(() => import("./Scene"), { ssr: false });
const Fallback = <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#26396a_0%,transparent_65%)]" />;

// Tailwind "skin" for the shared content blocks
export const skin = {
  text: "max-w-3xl text-[17px] leading-relaxed text-white/75 mb-6",
  notice: "mb-6 rounded-2xl border border-gold-500/40 bg-gold-500/[0.07] p-5 text-sm leading-relaxed text-gold-200",
  kv: "mb-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-navy-800/50",
  kvRow: "grid gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-6",
  kvK: "text-sm text-white/50",
  kvV: "text-[15px]",
  cards: "mb-6 grid gap-4 sm:grid-cols-2",
  card: "h-full rounded-2xl border border-gold-500/20 bg-gradient-to-b from-navy-700/60 to-navy-800/30 p-6 transition-colors hover:border-gold-400/60",
  cardT: "mb-2 font-serif text-2xl text-gold-200",
  cardP: "text-sm leading-relaxed text-white/60",
  tableWrap: "mb-6 overflow-x-auto rounded-2xl border border-white/10 bg-navy-800/40",
  th: "px-5 py-3 text-xs uppercase tracking-[0.2em] text-gold-400 border-b border-white/10",
  tr: "border-b border-white/5 last:border-0 hover:bg-white/[0.02]",
  td: "px-5 py-3.5 text-white/80",
  faqWrap: "space-y-3",
  faqItem: "rounded-2xl border border-gold-500/20 bg-navy-800/50",
  faqQ: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium",
  faqA: "px-5 pb-5 text-sm leading-relaxed text-white/60",
  steps: "space-y-3",
  step: "flex gap-5 rounded-2xl border border-white/10 bg-navy-800/40 p-5 text-white/80",
  stepN: "font-serif text-2xl text-gold-400",
  panel: "rounded-3xl border border-gold-500/20 bg-navy-800/50 p-8",
  btn: "inline-flex rounded-full bg-gold-grad px-6 py-3 text-sm font-semibold text-navy-900",
  link: "text-sm text-gold-300 hover:text-gold-200",
  label: "grid gap-2 text-sm text-white/60",
  input: "rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-white placeholder-white/30",
};

function SpotlightCard({ children, className = "", href }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const cls = `group relative overflow-hidden rounded-2xl border border-gold-500/15 bg-navy-800/60 p-6 transition-colors hover:border-gold-400/50 ${className}`;
  const glow = <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(320px circle at var(--x) var(--y), rgba(201,163,91,0.18), transparent 60%)" }} />;
  return href ? (
    <Link href={href} onMouseMove={onMove} className={cls}>{glow}{children}</Link>
  ) : (
    <div onMouseMove={onMove} className={cls}>{glow}{children}</div>
  );
}

function NavHub({ base }) {
  const nav = getNav(base);
  return (
    <div className="rounded-[28px] border border-gold-500/20 bg-navy-900/70 p-5 shadow-[0_40px_120px_-40px_rgba(201,163,91,0.35)] backdrop-blur sm:p-7">
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
        <span className="font-serif text-3xl font-bold">GTC<span className="text-gold-grad">FC</span></span>
        <span className="rounded-full border border-gold-500/30 px-4 py-1.5 text-xs tracking-wide text-gold-200">Website Navigation</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {nav.map((n, i) => (
          <Reveal key={n.href} delay={i * 0.07}>
            <SpotlightCard className="h-full">
              <Link href={n.href} className="relative flex items-center justify-between">
                <h3 className="font-serif text-2xl">{n.title}</h3>
                <Arrow className="h-5 w-5 -translate-x-2 text-gold-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="relative mt-2 text-sm text-white/55">
                {n.items.map((it, j) => (
                  <span key={it.href}>{j > 0 && " · "}<Link href={it.href} className="hover:text-gold-300">{it.label}</Link></span>
                ))}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}
        {[
          { label: "Open an Account", href: `${base}/open-account`, Icon: UserPlus },
          { label: "Client Login", href: `${base}/login`, Icon: LogIn },
        ].map(({ label, href, Icon }, i) => (
          <Reveal key={href} delay={0.3 + i * 0.07}>
            <SpotlightCard href={href} className="flex flex-col items-center gap-3 bg-transparent py-8 text-center">
              <Icon className="relative h-8 w-8 text-gold-300" />
              <span className="relative text-lg font-semibold">{label}</span>
              {!isLicensed && <span className="relative text-xs text-white/40">Available once licensed</span>}
            </SpotlightCard>
          </Reveal>
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
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-8 px-4 lg:grid-cols-2">
          <div className="relative z-10 pt-10 lg:pt-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-navy-800/60 px-4 py-1.5 text-xs tracking-[0.2em] text-gold-200">
              DUBAI · UNITED ARAB EMIRATES
            </motion.div>
            <h1 className="font-serif text-4xl font-semibold leading-[1.08] sm:text-5xl xl:text-6xl">
              <SplitWords text="Global markets." />
              <br />
              <SplitWords text="UAE standards." delay={0.25} wordClassName="text-gold-sheen" />
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
              {company.legalName} is preparing to give clients in the United Arab Emirates access to foreign exchange and OTC derivatives markets — under the framework of the UAE Capital Market Authority.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
              <Link href={`${base}/regulation`} className="group inline-flex items-center gap-2 rounded-full bg-gold-grad px-7 py-3.5 text-sm font-semibold text-navy-900 shadow-[0_0_40px_-10px_rgba(201,163,91,0.9)]">
                Our regulatory status <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href={`${base}/about`} className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium hover:border-gold-400 hover:text-gold-300">About GTCFC</Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} className="relative h-[420px] sm:h-[560px] lg:h-[680px]">
            <SceneBoundary fallback={Fallback}><Scene paused={!heroVisible} /></SceneBoundary>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-gold-500/15 bg-navy-900/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 lg:grid-cols-4">
          {homeHighlights.map((h, i) => (
            <Reveal key={h.k} delay={i * 0.08} className="border-white/10 px-2 py-8 text-center [&:not(:last-child)]:lg:border-r">
              <div className="text-xs uppercase tracking-[0.25em] text-white/45">{h.k}</div>
              <div className="mt-2 font-serif text-2xl text-gold-200 sm:text-3xl">{h.v}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24">
        <Reveal className="mb-10 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-400">Explore</div>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Everything in one place</h2>
        </Reveal>
        <NavHub base={base} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { Icon: Shield, t: "Client protection", d: "Segregated client money at UAE banks and clear, fair client terms." },
            { Icon: Scale, t: "Regulated conduct", d: "Built from day one around the CMA rulebook, with a dedicated Compliance Officer and MLRO." },
            { Icon: Globe, t: "Global access", d: "Major currency pairs, metals, indices and commodities through professional platforms." },
          ].map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.1}>
              <SpotlightCard className="h-full p-8">
                <Icon className="relative h-9 w-9 text-gold-300" />
                <h3 className="relative mt-6 font-serif text-2xl">{t}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/60">{d}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, intro }) {
  return (
    <section className="relative overflow-hidden border-b border-gold-500/15">
      <div className="pointer-events-none absolute -right-60 -top-60 h-[720px] w-[720px] bg-[radial-gradient(circle,rgba(201,163,91,0.14)_0%,transparent_65%)]" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.3em] text-gold-400">{eyebrow}</motion.div>
        <h1 className="mt-4 font-serif text-5xl font-semibold sm:text-7xl"><SplitWords text={title} /></h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="mt-8 h-px w-40 origin-left bg-gold-grad" />
        {intro && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 max-w-2xl text-lg text-white/60">{intro}</motion.p>}
      </div>
    </section>
  );
}

export function ContentPage({ slug }) {
  const p = pages[slug];
  const ids = p.sections.map((s) => s.id);
  const active = useActiveSection(ids);
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-32 space-y-1 border-l border-white/10">
            {p.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={`relative block py-2 pl-5 text-sm transition-colors ${active === s.id ? "text-gold-300" : "text-white/50 hover:text-white"}`}>
                {active === s.id && <motion.span layoutId="aurum-sub" className="absolute -left-px top-0 h-full w-px bg-gold-400" />}
                {s.title}
              </a>
            ))}
          </nav>
        </aside>
        <div>
          {p.banner && <Reveal><div className={skin.notice}>{p.banner}</div></Reveal>}
          {p.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="border-b border-white/5 py-10 last:border-0">
              <Reveal className="mb-8 flex items-baseline gap-4">
                <span className="font-serif text-lg text-gold-500">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-serif text-4xl text-gold-100">{s.title}</h2>
              </Reveal>
              <Blocks blocks={s.blocks} s={skin} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export function AccountPage({ kind, title }) {
  return (
    <>
      <PageHero eyebrow={kind === "login" ? "Client area" : "Get started"} title={title} />
      <div className="mx-auto max-w-3xl px-4 py-16"><AccountGate kind={kind} s={skin} /></div>
    </>
  );
}

export function ComingSoon() {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_70%_40%,#1c2d57_0%,#0b1530_45%,#03060f_100%)] lg:grid-cols-2">
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="font-serif text-2xl text-white/90 sm:text-3xl">
          {company.legalName}
        </motion.div>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 1 }} className="my-7 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        <h1 className="whitespace-nowrap font-serif text-[9vw] font-bold tracking-normal sm:text-6xl lg:text-[4.6vw] xl:text-6xl">
          <SplitWords text="COMING" delay={0.4} />
          <SplitWords text="SOON" delay={0.55} wordClassName="text-gold-sheen" />
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-4 font-serif text-xl text-white/80 sm:text-2xl">
          Our website is under construction.
        </motion.p>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 1 }} className="my-7 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.8 }} className="font-serif text-5xl font-bold text-gold-grad sm:text-6xl">
          {company.domain}
        </motion.div>
        <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} href={`mailto:${company.email}`} className="mt-10 rounded-full border border-gold-500/40 px-6 py-3 text-sm text-gold-200 transition hover:bg-gold-500/10">
          {company.email}
        </motion.a>
      </div>
      <div className="relative h-[420px] lg:h-auto">
        <SceneBoundary fallback={Fallback}><Scene /></SceneBoundary>
      </div>
      <p className="absolute inset-x-0 bottom-0 z-10 px-4 py-4 text-center text-[11px] text-white/40">
        {company.legalName} · Dubai, United Arab Emirates · This website does not offer any financial products or services.
      </p>
    </main>
  );
}
