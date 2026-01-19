"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FileText, Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Container, Button } from "@/components/ui";

const proofItems = [
  "React / Next.js / TypeScript",
  "Python / SQL / Data",
  "Deployed Production Apps",
  "ML / Research Projects",
];

const ctaLinks = [
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "GitHub", href: "https://github.com/omaradjei", icon: Github, external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/omaradjei", icon: Linkedin, external: true },
  { label: "Email", href: "mailto:omar@example.com", icon: Mail, external: true },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Create the main reveal animation
    tl.fromTo(
      ".hero-greeting",
      { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" },
      { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 }
    )
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.4"
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ".proof-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
        "-=0.3"
      )
      .fromTo(
        ".cta-button",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        "-=0.2"
      )
      .fromTo(
        ".scroll-indicator",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );

    // Floating animation for scroll indicator
    gsap.to(".scroll-indicator", {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Cursor blink animation
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Subtle floating particles effect
    const particles = heroRef.current.querySelectorAll(".particle");
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="particle absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
        <div className="particle absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          {/* Greeting */}
          <p className="hero-greeting text-accent font-mono text-sm mb-4 tracking-wider">
            Hi, my name is
          </p>

          {/* Title */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 tracking-tight">
            Omar Adjei
            <span ref={cursorRef} className="text-accent">
              .
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-2xl md:text-3xl lg:text-4xl text-neutral-400 mb-8 leading-relaxed">
            I build production web apps and data systems
            <br className="hidden md:block" />
            <span className="text-neutral-500">
              {" "}that turn messy problems into working software.
            </span>
          </p>

          {/* Proof Items */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
            {proofItems.map((item, index) => (
              <div
                key={item}
                className="proof-item flex items-center gap-2 text-sm text-neutral-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {item}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            {ctaLinks.map((link, index) => (
              <Button
                key={link.label}
                variant={index === 0 ? "primary" : "outline"}
                size="lg"
                href={link.href}
                external={link.external}
                className="cta-button"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-neutral-500 uppercase tracking-widest">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 text-neutral-500" />
        </div>
      </Container>
    </section>
  );
}
