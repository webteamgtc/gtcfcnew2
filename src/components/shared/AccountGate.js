"use client";
import { isLicensed, links, company } from "@/lib/site";
import Reveal from "./Reveal";

// Open Account / Client Login body. Disabled until the CMA licence is granted.
export default function AccountGate({ kind, s }) {
  const isOpen = kind === "open-account";
  const url = isOpen ? links.openAccount : links.clientLogin;

  if (isLicensed && url) {
    return (
      <Reveal className={s.panel}>
        {isOpen && (
          <ol className="mb-6 space-y-2 list-decimal pl-5 opacity-80">
            <li>Complete the application form</li>
            <li>Upload your Emirates ID or passport and proof of address</li>
            <li>Complete the suitability and appropriateness assessment</li>
            <li>Accept the client agreement and risk disclosure</li>
          </ol>
        )}
        <a href={url} className={s.btn}>{isOpen ? "Start your application" : "Go to client portal"}</a>
      </Reveal>
    );
  }

  return (
    <Reveal className={s.panel}>
      <div className={s.notice}>
        {isOpen
          ? `Account opening is not available yet. ${company.legalName} will accept clients only after its licence is granted by the UAE Capital Market Authority.`
          : "The client portal will open once our CMA licence is granted."}
      </div>
      {!isOpen && (
        <form className="mt-6 grid gap-4 max-w-md" aria-disabled="true">
          <label className={s.label}>Email<input disabled type="email" placeholder="name@example.com" className={s.input} /></label>
          <label className={s.label}>Password<input disabled type="password" placeholder="••••••••" className={s.input} /></label>
        </form>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <span aria-disabled="true" className={`${s.btn} pointer-events-none opacity-40`}>{isOpen ? "Start your application" : "Log in"}</span>
        <a href={`mailto:${company.email}?subject=Notify me at launch`} className={s.link}>Notify me at launch →</a>
      </div>
    </Reveal>
  );
}
