"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { company, getNav, isLicensed, licence, riskWarning, statusLine } from "@/lib/site";
import { Menu, Close } from "@/components/shared/Icons";

export function Logo({ base, className = "" }) {
  return (
    <Link href={base} className={`font-serif text-2xl font-bold tracking-wide ${className}`} aria-label={company.legalName}>
      GTC<span className="text-gold-grad">FC</span>
    </Link>
  );
}

function StatusBar({ base }) {
  return (
    <div className="relative z-50 border-b border-gold-500/20 bg-navy-800/90 text-center text-xs text-white/60">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400 align-middle" />
        {isLicensed ? (
          <>Licensed by the <b className="text-gold-300">UAE Capital Market Authority</b> · No. {licence.number}</>
        ) : (
          <>
            <b className="font-medium text-gold-300">CMA licence application in progress.</b> No regulated services are offered yet.{" "}
            <Link href={`${base}/regulation`} className="text-gold-400 underline-offset-4 hover:underline">Learn more</Link>
          </>
        )}
      </div>
    </div>
  );
}

function Header({ base }) {
  const nav = getNav(base);
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-500 ${solid ? "border-b border-gold-500/15 bg-navy-900/80 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4">
        <Logo base={base} />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((n) => {
            const active = path.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} className={`group relative py-2 text-sm tracking-wide transition-colors ${active ? "text-gold-300" : "text-white/70 hover:text-white"}`}>
                {n.title}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-gold-grad transition-all duration-500 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href={`${base}/login`} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition hover:border-gold-400 hover:text-gold-300">Client Login</Link>
          <Link href={`${base}/open-account`} className="rounded-full bg-gold-grad px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-[0_0_30px_-8px_rgba(201,163,91,0.8)] transition hover:brightness-110">Open an Account</Link>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-xl lg:hidden">
            <div className="flex h-20 items-center justify-between px-4">
              <Logo base={base} />
              <button onClick={() => setOpen(false)} aria-label="Close menu"><Close /></button>
            </div>
            <nav className="flex flex-col gap-2 px-6 pt-6">
              {[...nav, { title: "Open an Account", href: `${base}/open-account` }, { title: "Client Login", href: `${base}/login` }].map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 font-serif text-3xl">{n.title}</Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer({ base }) {
  const nav = getNav(base);
  return (
    <footer className="relative border-t border-gold-500/20 bg-navy-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Logo base={base} className="text-3xl" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              {company.legalName}<br />{company.address}
            </p>
            <a href={`mailto:${company.email}`} className="mt-4 inline-block text-sm text-gold-300 hover:text-gold-200">{company.email}</a>
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-gold-400">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-white">{n.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-gold-400">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href={`${base}/regulation#disclosures`} className="hover:text-white">Risk Disclosure</Link></li>
              <li><Link href={`${base}/regulation#disclosures`} className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href={`${base}/regulation#disclosures`} className="hover:text-white">Terms of Use</Link></li>
              <li><Link href={`${base}/support#complaints`} className="hover:text-white">Complaints</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 space-y-4 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/45">
          <p><b className="text-white/80">Regulatory status:</b> {statusLine}</p>
          <p><b className="text-white/80">Risk warning:</b> {riskWarning}</p>
          <p>Commercial licence no. <span className="placeholder-mark">{company.tradeLicence}</span> · © {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Shell({ base, children }) {
  return (
    <div className="min-h-screen bg-navy-950 bg-[radial-gradient(ellipse_at_top,#1a2a4f_0%,#050a18_55%,#03060f_100%)]">
      <StatusBar base={base} />
      <Header base={base} />
      <main>{children}</main>
      <Footer base={base} />
    </div>
  );
}
