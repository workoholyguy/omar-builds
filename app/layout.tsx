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
    default: "Omar Madjitov | Software Engineer",
    template: "%s | Omar Madjitov",
  },
  description:
    "Software engineer building reliable web applications and data systems. Full-stack development, ML pipelines, and production deployments.",
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
  authors: [{ name: "Omar Madjitov" }],
  creator: "Omar Madjitov",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omarmadjitov.com",
    siteName: "Omar Madjitov",
    title: "Omar Madjitov | Software Engineer",
    description:
      "Software engineer building reliable web applications and data systems. Full-stack development, ML pipelines, and production deployments.",
    images: [
      {
        url: "/images/og/default.png",
        width: 1200,
        height: 630,
        alt: "Omar Madjitov - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Madjitov | Software Engineer",
    description:
      "Software engineer building reliable web applications and data systems. Full-stack development, ML pipelines, and production deployments.",
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
