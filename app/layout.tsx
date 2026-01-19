import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer } from "@/components/layout";
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
  title: {
    default: "Omar Adjei | Software Engineer",
    template: "%s | Omar Adjei",
  },
  description:
    "I build production web apps and data/ML systems that turn messy problems into working software.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Data Scientist",
    "Machine Learning",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
  ],
  authors: [{ name: "Omar Adjei" }],
  creator: "Omar Adjei",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omaradjei.com",
    siteName: "Omar Adjei",
    title: "Omar Adjei | Software Engineer",
    description:
      "I build production web apps and data/ML systems that turn messy problems into working software.",
    images: [
      {
        url: "/images/og/default.png",
        width: 1200,
        height: 630,
        alt: "Omar Adjei - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Adjei | Software Engineer",
    description:
      "I build production web apps and data/ML systems that turn messy problems into working software.",
    images: ["/images/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
