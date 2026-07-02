import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Nomeas · For the people who care for newborns at night",
  description:
    "Nomeas builds tools for night nurses, newborn care specialists, and postpartum doulas. Hearth, our first product, is a private ledger for the nurse. Log your shifts, track what's owed, get paid faster. Free, and personally onboarded by the founder.",
  openGraph: {
    title: "Nomeas · For the people who care for newborns at night",
    description:
      "Hearth is a private ledger for night nurses. Log your shifts, track what's owed, get paid faster. Free. Join the first 100.",
    siteName: "Nomeas",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-canvas font-body text-ink-primary antialiased">
        {children}
      </body>
    </html>
  );
}
