import { notFound } from "next/navigation";
import { concepts } from "@/concepts";
import { pages } from "@/lib/content";

const ACCOUNT = { "open-account": "Open an Account", login: "Client Login" };
const SLUGS = [...Object.keys(pages), ...Object.keys(ACCOUNT)];

export function generateStaticParams({ params }) {
  return SLUGS.map((page) => ({ design: params.design, page }));
}

export function generateMetadata({ params }) {
  return { title: pages[params.page]?.title || ACCOUNT[params.page] };
}

export default function Page({ params }) {
  const c = concepts[params.design];
  if (!c || !SLUGS.includes(params.page)) notFound();
  const base = `/${params.design}`;
  if (ACCOUNT[params.page]) {
    const { AccountPage } = c;
    return <AccountPage base={base} kind={params.page} title={ACCOUNT[params.page]} />;
  }
  const { ContentPage } = c;
  return <ContentPage base={base} slug={params.page} />;
}
