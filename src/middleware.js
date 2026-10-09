import { NextResponse } from "next/server";

const DESIGNS = ["aurum", "horizon", "monolith"];

// coming-soon mode: everything shows the chosen concept's Coming Soon page,
// unless the visitor opened /?preview=<PREVIEW_KEY> (stored as a cookie).
export function middleware(req) {
  const mode = process.env.NEXT_PUBLIC_SITE_MODE || "coming-soon";
  const design = DESIGNS.includes(process.env.NEXT_PUBLIC_DESIGN) ? process.env.NEXT_PUBLIC_DESIGN : "aurum";
  const key = process.env.PREVIEW_KEY || "";
  const url = req.nextUrl;
  const preview = url.searchParams.get("preview");

  if (preview !== null) {
    const clean = url.clone();
    clean.searchParams.delete("preview");
    if (preview !== "off" && key && preview === key && clean.pathname === "/") clean.pathname = "/concepts";
    const res = NextResponse.redirect(clean);
    if (preview === "off") res.cookies.delete("gtcfc_preview");
    else if (key && preview === key)
      res.cookies.set("gtcfc_preview", key, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
    return res;
  }

  const previewing = key && req.cookies.get("gtcfc_preview")?.value === key;
  const open = mode === "full" || previewing;

  if (!open) {
    if (url.pathname === `/${design}/coming-soon`) return NextResponse.next();
    const t = url.clone();
    t.pathname = `/${design}/coming-soon`;
    t.search = "";
    return NextResponse.rewrite(t);
  }

  // Site open: "/" shows the chosen concept's home page
  if (url.pathname === "/") {
    const t = url.clone();
    t.pathname = `/${design}`;
    return NextResponse.rewrite(t);
  }
  // /concepts chooser is only for previewers
  if (url.pathname.startsWith("/concepts") && !previewing) {
    const t = url.clone();
    t.pathname = "/";
    return NextResponse.redirect(t);
  }
  // Public visitors only see the chosen concept
  const other = DESIGNS.find((d) => d !== design && (url.pathname === `/${d}` || url.pathname.startsWith(`/${d}/`)));
  if (other && !previewing) {
    const t = url.clone();
    t.pathname = url.pathname.replace(`/${other}`, `/${design}`);
    return NextResponse.redirect(t);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icon.svg|robots.txt|.*\\.(?:png|jpg|svg|webp|ico|glb|hdr)).*)"],
};
