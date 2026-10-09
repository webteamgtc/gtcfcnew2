// Company details and licence status — shared by all three design concepts.
// Anything in [square brackets] is a placeholder to fill in before launch.

export const DESIGNS = [
  { id: "aurum", name: "Aurum", tagline: "Luxury navy & gold, 3D particle globe", accent: "#c9a35b" },
  { id: "horizon", name: "Horizon", tagline: "Glass panels, floating 3D gold forms", accent: "#e8cf96" },
  { id: "monolith", name: "Monolith", tagline: "Black bento layout, 3D wave field", accent: "#ffffff" },
];

export const company = {
  legalName: "GTC Financial Consultancy LLC",
  shortName: "GTCFC",
  domain: "GTCFC.com",
  group: "GTC Group",
  address: "[Office address], Dubai, United Arab Emirates",
  tradeLicence: "[DED trade licence number]",
  email: "info@gtcfc.com",
  complaintsEmail: "complaints@gtcfc.com",
  phone: "[+971 phone number]",
  hours: "Monday – Friday, 9:00 – 18:00 (GST)",
};

export const licence = {
  status: process.env.NEXT_PUBLIC_LICENCE_STATUS === "licensed" ? "licensed" : "pending",
  regulator: "Capital Market Authority (CMA), United Arab Emirates",
  category: "Category 1",
  activity: "Trading Broker of OTC Derivatives and Currencies in the Spot Market (Forex)",
  number: process.env.NEXT_PUBLIC_LICENCE_NUMBER || "[CMA licence number]",
  date: process.env.NEXT_PUBLIC_LICENCE_DATE || "[date of issue]",
};

export const isLicensed = licence.status === "licensed";

export const links = {
  openAccount: process.env.NEXT_PUBLIC_OPEN_ACCOUNT_URL || "",
  clientLogin: process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL || "",
};

export const riskWarning =
  "Trading in OTC derivatives, contracts for difference (CFDs) and foreign exchange on margin carries a high level of risk and may not be suitable for all investors. Leverage can work against you as well as for you, and you may lose more than your initial deposit. Make sure you fully understand the risks involved and seek independent advice if necessary.";

export const statusLine = isLicensed
  ? `${company.legalName} is licensed and regulated by the ${licence.regulator} under licence no. ${licence.number} (${licence.category} – ${licence.activity}).`
  : `${company.legalName} has applied to the ${licence.regulator} for a ${licence.category} licence. It does not currently offer any regulated financial services, and nothing on this website is an offer or solicitation to provide them.`;

// Navigation, as in the GM's reference screen. `base` is the concept prefix, e.g. "/aurum".
export function getNav(base) {
  return [
    { title: "About Us", href: `${base}/about`, items: [["Company", "company"], ["Group", "group"], ["Contact", "contact"]] },
    { title: "Regulation", href: `${base}/regulation`, items: [["Licence", "licence"], ["Authorisation", "authorisation"], ["Disclosures", "disclosures"]] },
    { title: "Markets & Services", href: `${base}/markets`, items: [["Products", "products"], ["Platforms", "platforms"], ["Conditions", "conditions"]] },
    { title: "Support", href: `${base}/support`, items: [["FAQ", "faq"], ["Contact", "contact"], ["Complaints", "complaints"]] },
  ].map((n) => ({ ...n, items: n.items.map(([label, id]) => ({ label, href: `${n.href}#${id}` })) }));
}
