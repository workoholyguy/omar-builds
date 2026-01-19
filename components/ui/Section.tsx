"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}

export function Section({
  children,
  className,
  id,
  animate = true,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!animate || !sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".animate-in");

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, [animate]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("py-16 md:py-24", className)}
    >
      {children}
    </section>
  );
}
