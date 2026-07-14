import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kekkimed.com"),
  title: "Kekki | Clinical Knowledge Engineering",
  description:
    "A physician-built clinical knowledge engineering project: precision-first parsing, validated concept networks, and adaptive medical education.",
  openGraph: {
    title: "Kekki | Clinical Knowledge Engineering",
    description:
      "From a 22,132-record educational corpus to structured, auditable clinical knowledge and adaptive learning tools.",
    type: "website",
    url: "/",
    siteName: "Kekki",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kekki Clinical Knowledge Engineering project overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kekki | Clinical Knowledge Engineering",
    description:
      "A physician-built, precision-first clinical knowledge system.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
