import { notFound } from "next/navigation";
import { concepts } from "@/concepts";

export function generateStaticParams() {
  return Object.keys(concepts).map((design) => ({ design }));
}

export default function SiteLayout({ children, params }) {
  const c = concepts[params.design];
  if (!c) notFound();
  const { Shell } = c;
  return <Shell base={`/${params.design}`}>{children}</Shell>;
}
