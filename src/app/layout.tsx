import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vyvfeed.vyvox.fr"),
  title: {
    default: "VYVFEED — Agrégateur de news Tech · IA · Cyber",
    template: "%s · VYVFEED",
  },
  description:
    "Veille premium Tech · IA · Cyber avec résumés générés par Claude. Un produit VYVOX.",
  openGraph: {
    title: "VYVFEED",
    description:
      "Veille premium Tech · IA · Cyber avec résumés générés par Claude.",
    url: "https://vyvfeed.vyvox.fr",
    siteName: "VYVFEED",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${lora.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-vyvfeed-bg text-vyvfeed-text">
        {children}
      </body>
    </html>
  );
}
