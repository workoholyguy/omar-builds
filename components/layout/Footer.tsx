"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/workoholyguy",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/omar-madjitov/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:omadjitov1@icloud.com",
    icon: Mail,
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current.querySelectorAll(".footer-item"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t border-neutral-800/50 bg-neutral-950"
    >
      <Container>
        <div className="py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left side */}
            <div className="footer-item">
              <p className="text-sm text-neutral-400">
                Built with Next.js, TypeScript, and Tailwind CSS.
              </p>
            </div>

            {/* Social Links */}
            <div className="footer-item flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-500 hover:text-accent transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-item mt-8 pt-8 border-t border-neutral-800/50">
            <p className="text-xs text-neutral-500 text-center">
              © {new Date().getFullYear()} Omar Madjitov. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
