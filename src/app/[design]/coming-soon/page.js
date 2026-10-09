import { notFound } from "next/navigation";
import { concepts } from "@/concepts";

export const metadata = { title: "Coming Soon" };

export function generateStaticParams() {
  return Object.keys(concepts).map((design) => ({ design }));
}

export default function ComingSoonPage({ params }) {
  const c = concepts[params.design];
  if (!c) notFound();
  const { ComingSoon } = c;
  return <ComingSoon />;
}
