"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { company, getNav, isLicensed, licence, riskWarning, statusLine } from "@/lib/site";
import { UserPlus, LogIn, Close } from "@/components/shared/Icons";

// The reference "Website Navigation" panel: 4 cards + 2 actions on black.
export function NavPanel({ base, onNavigate, animate = true }) {
  const nav = getNav(base);
  const item = (i) => (animate ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1], duration: 0.6 } } : {});
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {nav.map((n, i) => (
        <motion.div key={n.href} {...item(i)} className="group rounded-2xl bg-ink-700 p-6 transition-colors hover:bg-ink-600/80">
          <Link href={n.href} onClick={onNavigate} className="block font-display text-2xl font-bold">{n.title}</Link>
          <p className="mt-2 text-[17px] text-white/55">
            {n.items.map((it, j) => (
              <span key={it.href}>{j > 0 && " · "}<Link href={it.href} onClick={onNavigate} className="hover:text-white">{it.label}</Link></span>
            ))}
          </p>
        </motion.div>
      ))}
      {[{ l: "Open an Account", h: `${base}/open-account`, I: UserPlus }, { l: "Client Login", h: `${base}/login`, I: LogIn }].map(({ l, h, I }, i) => (
        <motion.div key={h} {...item(4 + i)}>
          <Link href={h} onClick={onNavigate} className="flex flex-col items-center gap-3 rounded-2xl border border-ink-600 py-7 text-center transition-colors hover:border-white/40">
            <I className="h-8 w-8" />
            <span className="font-display text-lg font-semibold">{l}</span>
            {!isLicensed && <span className="text-xs text-white/35">Available once licensed</span>}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function Header({ base }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-8">
          <Link href={base} className="font-display text-3xl font-bold tracking-tight">GTCFC</Link>
          <button onClick={() => setOpen(true)} className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black">Website Navigation</button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-50 overflow-y-auto bg-black">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
              <div className="flex h-20 items-center justify-between border-b border-ink-600">
                <span className="font-display text-3xl font-bold tracking-tight">GTCFC</span>
                <button onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-full bg-ink-700 px-5 py-2 text-sm"><Close className="h-4 w-4" /> Close</button>
              </div>
              <div className="py-8"><NavPanel base={base} onNavigate={() => setOpen(false)} /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer({ base }) {
  return (
    <footer className="border-t border-ink-600 bg-black">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="max-w-md text-sm text-white/50">{company.legalName}<br />{company.address}</p>
            <a href={`mailto:${company.email}`} className="mt-4 inline-block text-sm underline underline-offset-4">{company.email}</a>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
            <Link href={`${base}/regulation#disclosures`} className="hover:text-white">Risk Disclosure</Link>
            <Link href={`${base}/regulation#disclosures`} className="hover:text-white">Privacy</Link>
            <Link href={`${base}/support#complaints`} className="hover:text-white">Complaints</Link>
          </div>
        </div>
        <div className="mt-12 space-y-3 text-xs leading-relaxed text-white/40">
          <p><b className="text-white/70">Regulatory status:</b> {statusLine}</p>
          <p><b className="text-white/70">Risk warning:</b> {riskWarning}</p>
        </div>
        <div className="mt-12 select-none font-display text-[22vw] font-bold leading-[0.8] tracking-tighter text-ink-800 sm:text-[18vw]">GTCFC</div>
        <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-white/35">
          <span>© {new Date().getFullYear()} {company.legalName}</span>
          <span>Commercial licence no. <span className="placeholder-mark">{company.tradeLicence}</span></span>
          <span>{isLicensed ? `CMA licence no. ${licence.number}` : "CMA licence application in progress"}</span>
        </div>
      </div>
    </footer>
  );
}

export default function Shell({ base, children }) {
  return (
    <div className="min-h-screen bg-black font-display text-white">
      <Header base={base} />
      <main>{children}</main>
      <Footer base={base} />
    </div>
  );
}
