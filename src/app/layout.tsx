import type { ReactNode } from "react";
import { Geist, Unbounded } from "next/font/google";
import "./globals.css";

const brand = Unbounded({
  variable: "--font-brand",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${brand.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
