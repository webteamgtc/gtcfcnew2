import Link from "next/link";
import { DESIGNS, company } from "@/lib/site";

export const metadata = { title: "Design Concepts", robots: { index: false } };

const PAGES = [["Coming Soon", "/coming-soon"], ["Home", ""], ["About", "/about"], ["Regulation", "/regulation"], ["Markets", "/markets"], ["Support", "/support"], ["Open Account", "/open-account"], ["Login", "/login"]];

export default function Concepts() {
  return (
    <main className="min-h-screen bg-[#05070d] px-4 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-xs uppercase tracking-[0.3em] text-gold-400">Internal preview · {company.legalName}</div>
        <h1 className="mt-3 font-serif text-5xl font-semibold sm:text-6xl">Website design concepts</h1>
        <p className="mt-4 max-w-2xl text-white/60">
          Three directions for GTCFC.com. Each has the same pages and content. Choose one and set <code className="rounded bg-white/10 px-1.5">NEXT_PUBLIC_DESIGN</code> to make it the live site.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DESIGNS.map((d, i) => (
            <div key={d.id} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">Concept {i + 1}</span>
                <span className="h-3 w-3 rounded-full" style={{ background: d.accent }} />
              </div>
              <h2 className="mt-4 text-3xl font-semibold">{d.name}</h2>
              <p className="mt-2 text-sm text-white/55">{d.tagline}</p>
              <Link href={`/${d.id}`} className="mt-6 rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-black hover:bg-gold-200">Open {d.name}</Link>
              <div className="mt-6 flex flex-wrap gap-2">
                {PAGES.map(([l, p]) => (
                  <Link key={l} href={`/${d.id}${p}`} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:border-white/40 hover:text-white">{l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
