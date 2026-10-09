import { company, licence, isLicensed, riskWarning, statusLine } from "./site";

// Page content shared by all concepts. Each concept renders these blocks in its own style.
// Block types: text, kv, cards, table, faq, steps, notice

const pending = !isLicensed;

export const pages = {
  about: {
    eyebrow: "Who we are",
    title: "About Us",
    intro: `${company.legalName} is a UAE mainland company based in Dubai, part of the ${company.group}.`,
    sections: [
      {
        id: "company",
        title: "Company",
        blocks: [
          { type: "text", text: `${company.legalName} was established in Dubai to give clients in the United Arab Emirates access to global currency and OTC derivatives markets — with transparent pricing, strong client protection and full compliance with UAE regulation.` },
          { type: "kv", rows: [["Legal name", company.legalName], ["Legal form", "Limited Liability Company (UAE mainland)"], ["Commercial licence", company.tradeLicence], ["Registered office", company.address]] },
        ],
      },
      {
        id: "group",
        title: "Group",
        blocks: [
          { type: "text", text: `We are part of the ${company.group}, an international financial services group.` },
          { type: "cards", items: [
            { title: "Integrity", text: "Clear, honest communication and putting client interests first." },
            { title: "Security", text: "Segregated client funds and robust risk management." },
            { title: "Management", text: "[Board of directors and senior management — names and roles as approved by the CMA]" },
          ] },
        ],
      },
      {
        id: "contact",
        title: "Contact",
        blocks: [{ type: "kv", rows: [["Address", company.address], ["Email", company.email], ["Phone", company.phone], ["Office hours", company.hours]] }],
      },
    ],
  },

  regulation: {
    eyebrow: "Trust & transparency",
    title: "Regulation",
    intro: "Our regulatory status, licence details and legal disclosures.",
    sections: [
      {
        id: "licence",
        title: "Licence",
        blocks: [
          { type: "notice", text: statusLine },
          { type: "kv", rows: [
            ["Regulator", licence.regulator],
            ["Licence category", licence.category],
            ["Regulated activity", licence.activity],
            ["Status", pending ? "Application in progress" : "Licensed"],
            ["Licence number", pending ? "Issued on approval" : licence.number],
            ["Date of issue", pending ? "Issued on approval" : licence.date],
          ] },
          { type: "text", text: "You can verify licensed firms on the official CMA website: uaecma.gov.ae" },
        ],
      },
      {
        id: "authorisation",
        title: "Authorisation",
        blocks: [
          { type: "text", text: "The Capital Market Authority (CMA) is the federal regulator of the UAE capital markets under Federal Decree-Law No. 32 of 2025 and Federal Decree-Law No. 33 of 2025. A firm must hold a CMA licence before carrying on any regulated financial activity with clients in the UAE." },
          { type: "cards", items: [
            { title: "Licence scope", text: "Dealing as a trading broker in OTC derivatives and in currencies on the spot market (Forex) for UAE clients." },
            { title: "Client protection", text: "Segregated client funds at UAE banks, client classification and suitability checks, formal complaints handling." },
            { title: "Compliance & AML", text: "Dedicated Compliance Officer and MLRO, KYC on every client, reporting to the UAE Financial Intelligence Unit." },
          ] },
        ],
      },
      {
        id: "disclosures",
        title: "Disclosures",
        blocks: [
          { type: "notice", text: `Risk warning: ${riskWarning}` },
          { type: "table", head: ["Document", "Status"], rows: [
            "Risk Disclosure Statement", "Client Agreement / Terms and Conditions", "Order Execution Policy", "Conflicts of Interest Policy",
            "Client Money and Assets Policy", "Privacy and Data Protection Policy", "Complaints Handling Procedure", "AML / KYC Policy (summary)",
          ].map((d) => [d, pending ? "Pending approval" : "Download (PDF)"]) },
        ],
      },
    ],
  },

  markets: {
    eyebrow: "What we will offer",
    title: "Markets & Services",
    intro: "Products, platforms and trading conditions planned under our CMA licence.",
    banner: pending ? "These services are not available yet. They will be offered only after the licence is granted by the UAE Capital Market Authority." : null,
    sections: [
      {
        id: "products",
        title: "Products",
        blocks: [{ type: "cards", items: [
          { title: "Forex", text: "Major, minor and exotic currency pairs on the spot market.", icon: "fx" },
          { title: "Metals", text: "Gold and silver against the US dollar.", icon: "metal" },
          { title: "Indices", text: "CFDs on leading global stock indices.", icon: "index" },
          { title: "Commodities", text: "CFDs on energy products such as crude oil.", icon: "oil" },
        ] }],
      },
      {
        id: "platforms",
        title: "Platforms",
        blocks: [{ type: "cards", items: [
          { title: "Trading platform", text: "[Platform name] — desktop, web and mobile." },
          { title: "Client portal", text: "Account opening, KYC documents, deposits, withdrawals and statements in one secure place." },
        ] }],
      },
      {
        id: "conditions",
        title: "Conditions",
        blocks: [{ type: "table", head: ["Item", "Details"], rows: [
          ["Account types", "[Retail / Professional]"],
          ["Maximum leverage", "[As permitted by the CMA per client category]"],
          ["Minimum deposit", "[Amount]"],
          ["Spreads & commissions", "[Published once approved]"],
          ["Margin call / stop-out", "[Levels]"],
          ["Funding methods", "[UAE bank transfer, cards …]"],
          ["Client funds", "Segregated client accounts at UAE banks"],
        ] }],
      },
    ],
  },

  support: {
    eyebrow: "We are here to help",
    title: "Support",
    intro: "Answers to common questions, how to reach us and how to raise a complaint.",
    sections: [
      {
        id: "faq",
        title: "FAQ",
        blocks: [{ type: "faq", items: [
          { q: `Is ${company.legalName} licensed?`, a: "We have applied to the UAE Capital Market Authority (CMA) for a Category 1 licence. Until it is granted, we do not offer any regulated services. Our status is always shown on the Regulation page." },
          { q: "When can I open an account?", a: "Account opening starts only after the CMA licence is granted. Contact us to be notified." },
          { q: "How will my funds be protected?", a: "Client money will be held in segregated client accounts at UAE banks, separate from the company's own funds." },
          { q: "What documents will I need?", a: "A valid Emirates ID or passport, proof of address, and information about your financial situation and trading experience." },
        ] }],
      },
      {
        id: "contact",
        title: "Contact",
        blocks: [{ type: "kv", rows: [["Email", company.email], ["Phone", company.phone], ["Address", company.address], ["Hours", company.hours]] }],
      },
      {
        id: "complaints",
        title: "Complaints",
        blocks: [{ type: "steps", items: [
          `Email ${company.complaintsEmail} with your name, account number (if any) and the details of your complaint.`,
          "We acknowledge your complaint within [2] business days.",
          "We investigate and send a final written response within [15] business days.",
          "If you are not satisfied, you may escalate your complaint to the UAE Capital Market Authority.",
        ] }],
      },
    ],
  },
};

export const homeHighlights = [
  { k: "Regulator", v: "UAE CMA" },
  { k: "Licence", v: "Category 1" },
  { k: "Markets", v: "FX · Metals · Indices" },
  { k: "Base", v: "Dubai, UAE" },
];
