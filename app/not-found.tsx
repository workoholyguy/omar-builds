"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Home, ArrowLeft } from "lucide-react";
import { Container, Button } from "@/components/ui";

export default function NotFound() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".error-code",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8 }
    )
      .fromTo(
        ".error-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        ".error-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".error-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );

    // Floating animation for 404
    gsap.to(".error-code", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div ref={pageRef} className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Container>
        <div className="text-center">
          <p className="error-code text-8xl md:text-9xl font-bold text-accent/20 mb-4">
            404
          </p>
          <h1 className="error-title text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page not found
          </h1>
          <p className="error-text text-neutral-400 text-lg mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="error-buttons flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
            <Button variant="outline" href="/projects">
              <ArrowLeft className="h-4 w-4" />
              View Projects
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
