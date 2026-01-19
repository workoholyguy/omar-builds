"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowUpRight } from "lucide-react";
import { Container, Button } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(
      ".contact-label",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    )
      .fromTo(
        ".contact-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ".contact-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ".contact-button",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <p className="contact-label text-accent font-mono text-sm mb-4">
            Get In Touch
          </p>
          <h2 className="contact-title text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let&apos;s work together
          </h2>
          <p className="contact-text text-neutral-400 text-lg mb-8 leading-relaxed">
            I&apos;m seeking roles where I can build software people rely on,
            collaborate with experienced teammates, and help ship real products.
            If that sounds like your team, let&apos;s connect.
          </p>
          <Button
            variant="primary"
            size="lg"
            href="mailto:omadjitov1@icloud.com"
            external
            className="contact-button"
          >
            <Mail className="h-5 w-5" />
            Say Hello
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
