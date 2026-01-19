"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Download, ExternalLink } from "lucide-react";
import { Container, Section, Button } from "@/components/ui";

export default function ResumePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".resume-label",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        ".resume-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        ".resume-actions",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".resume-embed",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.2"
      );
  }, []);

  return (
    <div ref={pageRef}>
      <Section className="pt-8">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <p className="resume-label text-accent font-mono text-sm mb-2">
              My Resume
            </p>
            <h1 className="resume-title text-4xl md:text-5xl font-bold text-foreground mb-6">
              Resume
            </h1>

            {/* Actions */}
            <div className="resume-actions flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                href="/resume.pdf"
                external
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/resume.pdf"
                external
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </Button>
            </div>
          </div>

          {/* PDF Embed */}
          <div className="resume-embed relative aspect-[8.5/11] max-w-4xl rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-neutral-400 mb-4">
                  Resume PDF will be displayed here.
                </p>
                <p className="text-sm text-neutral-500">
                  Add your resume.pdf to the /public folder.
                </p>
              </div>
            </div>
            {/* Uncomment when PDF is available */}
            {/* <iframe
              src="/resume.pdf"
              className="w-full h-full"
              title="Resume"
            /> */}
          </div>

          {/* Quick Summary */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30">
              <h3 className="font-semibold text-foreground mb-2">Skills</h3>
              <p className="text-sm text-neutral-400">
                React, Next.js, TypeScript, Python, SQL, Node.js, PostgreSQL,
                Docker
              </p>
            </div>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30">
              <h3 className="font-semibold text-foreground mb-2">Education</h3>
              <p className="text-sm text-neutral-400">
                B.S. Computer Science, Georgia State University (Expected 2025)
              </p>
            </div>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30">
              <h3 className="font-semibold text-foreground mb-2">Focus Areas</h3>
              <p className="text-sm text-neutral-400">
                Full Stack Development, Data Engineering, Machine Learning
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
