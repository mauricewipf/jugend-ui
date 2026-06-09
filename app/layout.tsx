import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { getSiteUrl } from "@/lib/site-url";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";
import "@fontsource/opendyslexic/400-italic.css";
import "@fontsource/opendyslexic/700-italic.css";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Jugend UI",
  description:
    "Art Nouveau / Jugendstil UI components. Free. Open Source. Copy-paste shadcn/ui components with decorative SVG frames.",
  openGraph: {
    title: "Jugend UI",
    description:
      "Art Nouveau / Jugendstil UI components. Free. Open Source.",
    images: ["/readme-showcase.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jugend UI",
    description:
      "Art Nouveau / Jugendstil UI components. Free. Open Source.",
    images: ["/readme-showcase.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
