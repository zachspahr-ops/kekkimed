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
  title: "Kekki | Clinical Data Tools",
  description:
    "A physician-built collection of question parsing and clinical concept-network tools.",
  openGraph: {
    title: "Kekki | Clinical Data Tools",
    description:
      "Question parsing, human review, and versioned clinical concept networks.",
    type: "website",
    url: "/",
    siteName: "Kekki",
    images: [
      {
        url: "/og-dark.png",
        width: 1200,
        height: 630,
        alt: "Kekki clinical data tools index",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kekki | Clinical Data Tools",
    description:
      "Question parsing, human review, and versioned clinical concept networks.",
    images: ["/og-dark.png"],
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
