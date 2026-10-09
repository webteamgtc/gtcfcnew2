import "./globals.css";
import { company } from "@/lib/site";
import Providers from "@/components/shared/Providers";

export const metadata = {
  title: { default: company.legalName, template: `%s | ${company.shortName}` },
  description: `${company.legalName} — Dubai, United Arab Emirates.`,
  icons: { icon: "/icon.svg" },
};

export const viewport = { themeColor: "#050a18" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
