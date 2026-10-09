"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { company, getNav, isLicensed, licence, riskWarning, statusLine } from "@/lib/site";
import { Menu, Close } from "@/components/shared/Icons";

export function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden="true">
      <motion.div animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-[#2b4bb3]/30 blur-[140px]" />
      <motion.div animate={{ x: [0, -70, 50, 0], y: [0, 50, -30, 0] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[-10%] top-[20%] h-[460px] w-[460px] rounded-full bg-gold-500/20 blur-[140px]" />
      <motion.div animate={{ x: [0, 40, -60, 0], y: [0, 40, -20, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-20%] left-[30%] h-[520px] w-[520px] rounded-full bg-[#5b3bb3]/20 blur-[160px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  );
}

function Header({ base }) {
  const nav = getNav(base);
  const path = usePathname();
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 rounded-full border border-white/10 bg-[#0a1024]/85 px-4 py-1.5 text-center text-[11px] text-white/60 backdrop-blur-xl">
          {isLicensed ? <>Licensed by the UAE Capital Market Authority · No. {licence.number}</> : <>● <span className="text-gold-200">CMA licence application in progress</span> — no regulated services are offered yet</>}
        </div>
        <header className="flex h-16 items-center justify-between rounded-full border border-white/10 bg-[#0a1024]/85 pl-6 pr-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <Link href={base} className="text-lg font-semibold tracking-tight">GTC<span className="text-gold-300">FC</span></Link>
          <nav className="hidden items-center lg:flex" onMouseLeave={() => setHover(null)} aria-label="Main">
            {nav.map((n) => {
              const active = path.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} onMouseEnter={() => setHover(n.href)} className={`relative px-4 py-2 text-sm transition-colors ${active ? "text-white" : "text-white/60 hover:text-white"}`}>
                  {(hover === n.href || (!hover && active)) && <motion.span layoutId="hz-pill" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  <span className="relative">{n.title}</span>
                </Link>
              );
            })}
          </nav>
          <div className="hidden gap-2 lg:flex">
            <Link href={`${base}/login`} className="rounded-full px-4 py-2.5 text-sm text-white/80 hover:text-white">Client Login</Link>
            <Link href={`${base}/open-account`} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0a1024] transition hover:bg-gold-200">Open an Account</Link>
          </div>
          <button className="mr-3 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <Close /> : <Menu />}</button>
        </header>
        <AnimatePresence>
          {open && (
            <motion.nav initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} className="mt-2 grid gap-1 rounded-3xl border border-white/10 bg-[#0a1024]/90 p-3 backdrop-blur-xl lg:hidden">
              {[...nav, { title: "Open an Account", href: `${base}/open-account` }, { title: "Client Login", href: `${base}/login` }].map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-lg hover:bg-white/5">{n.title}</Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Footer({ base }) {
  const nav = getNav(base);
  return (
    <footer className="relative z-10 px-3 pb-3">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="text-3xl font-semibold tracking-tight">GTC<span className="text-gold-300">FC</span></div>
            <p className="mt-3 max-w-xs text-sm text-white/50">{company.legalName}<br />{company.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm">
            <ul className="space-y-2 text-white/60">{nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-white">{n.title}</Link></li>)}</ul>
            <ul className="space-y-2 text-white/60">
              <li><Link href={`${base}/regulation#disclosures`} className="hover:text-white">Risk Disclosure</Link></li>
              <li><Link href={`${base}/regulation#disclosures`} className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href={`${base}/support#complaints`} className="hover:text-white">Complaints</Link></li>
              <li><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 space-y-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/40">
          <p><b className="text-white/70">Regulatory status:</b> {statusLine}</p>
          <p><b className="text-white/70">Risk warning:</b> {riskWarning}</p>
          <p>Commercial licence no. <span className="placeholder-mark">{company.tradeLicence}</span> · © {new Date().getFullYear()} {company.legalName}</p>
        </div>
      </div>
    </footer>
  );
}

export default function Shell({ base, children }) {
  return (
    <div className="relative min-h-screen bg-[#060a1a] text-white">
      <Aurora />
      <Header base={base} />
      <main className="relative z-10 pt-32">{children}</main>
      <Footer base={base} />
    </div>
  );
}
