import type { Metadata } from "next";
import { Alfa_Slab_One, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const alfaSlabOne = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AI Adoptie Profiel — De WILD-scan — Bureautje Aap",
  description: "Hoe klaar is jouw organisatie voor AI? Doe de WILD-scan en ontdek jullie adoptie-profiel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body
        className={`${alfaSlabOne.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
