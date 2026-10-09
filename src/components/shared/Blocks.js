"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { Plus } from "./Icons";

// Highlights [placeholders] so they are easy to spot and fill in.
export function Fmt({ text }) {
  return String(text)
    .split(/(\[[^\]]+\])/g)
    .map((part, i) => (part.startsWith("[") ? <span key={i} className="placeholder-mark">{part}</span> : <span key={i}>{part}</span>));
}

function Faq({ items, s }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={s.faqWrap}>
      {items.map((f, i) => (
        <div key={f.q} className={s.faqItem}>
          <button className={s.faqQ} onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{f.q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0"><Plus width={18} height={18} /></motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className={s.faqA}>{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Renders content blocks using a concept-specific "skin" (map of Tailwind classes).
export default function Blocks({ blocks, s }) {
  return blocks.map((b, i) => {
    const d = i * 0.06;
    switch (b.type) {
      case "text":
        return <Reveal key={i} delay={d}><p className={s.text}><Fmt text={b.text} /></p></Reveal>;
      case "notice":
        return <Reveal key={i} delay={d}><div className={s.notice}><Fmt text={b.text} /></div></Reveal>;
      case "kv":
        return (
          <Reveal key={i} delay={d}>
            <dl className={s.kv}>
              {b.rows.map(([k, v]) => (
                <div key={k} className={s.kvRow}><dt className={s.kvK}>{k}</dt><dd className={s.kvV}><Fmt text={v} /></dd></div>
              ))}
            </dl>
          </Reveal>
        );
      case "cards":
        return (
          <div key={i} className={`${s.cards} ${b.items.length === 4 ? "lg:grid-cols-4" : b.items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
            {b.items.map((c, j) => (
              <Reveal key={c.title} delay={j * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={s.card}>
                  <h3 className={s.cardT}>{c.title}</h3>
                  <p className={s.cardP}><Fmt text={c.text} /></p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        );
      case "table":
        return (
          <Reveal key={i} delay={d}>
            <div className={s.tableWrap}>
              <table className="w-full text-left text-sm">
                <thead><tr>{b.head.map((h) => <th key={h} className={s.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {b.rows.map((r) => (
                    <tr key={r[0]} className={s.tr}>{r.map((c, k) => <td key={k} className={s.td}><Fmt text={c} /></td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        );
      case "faq":
        return <Faq key={i} items={b.items} s={s} />;
      case "steps":
        return (
          <ol key={i} className={s.steps}>
            {b.items.map((t, j) => (
              <Reveal key={j} delay={j * 0.08} as="li" className={s.step}>
                <span className={s.stepN}>{String(j + 1).padStart(2, "0")}</span>
                <span><Fmt text={t} /></span>
              </Reveal>
            ))}
          </ol>
        );
      default:
        return null;
    }
  });
}
