import { notFound } from "next/navigation";
import { concepts } from "@/concepts";

export default function Home({ params }) {
  const c = concepts[params.design];
  if (!c) notFound();
  const { Home: View } = c;
  return <View base={`/${params.design}`} />;
}
