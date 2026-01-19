"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import { Container, Section, Button } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    title: "Software Engineering Intern",
    company: "Tech Company",
    period: "Summer 2024",
    description:
      "Built internal tools and contributed to production features using React and Node.js.",
  },
];

const education = [
  {
    degree: "B.S. Computer Science",
    school: "Georgia State University",
    period: "Expected 2025",
    details: "Focus on software engineering and data science.",
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    // Hero animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".about-label",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        ".about-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        ".about-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );

    // Sections animation
    gsap.fromTo(
      ".about-section",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-sections",
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={pageRef}>
      <Section className="pt-8">
        <Container>
          <div className="max-w-3xl">
            {/* Header */}
            <p className="about-label text-accent font-mono text-sm mb-2">
              About Me
            </p>
            <h1 className="about-title text-4xl md:text-5xl font-bold text-foreground mb-8">
              Building software that works
            </h1>

            {/* Bio */}
            <div className="about-content space-y-6 text-neutral-400 text-lg leading-relaxed mb-12">
              <p>
                I&apos;m a software engineer based in Atlanta, currently studying
                Computer Science at Georgia State University. I build web
                applications and data systems that solve real problems.
              </p>
              <p>
                My work spans the full stack — from React frontends to Python
                data pipelines. I enjoy the challenge of taking messy
                requirements and turning them into clean, maintainable code.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m probably reading about distributed
                systems, experimenting with new frameworks, or working on side
                projects that may or may not see the light of day.
              </p>
            </div>

            {/* Location */}
            <div className="about-content flex items-center gap-2 text-neutral-500 mb-12">
              <MapPin className="h-4 w-4" />
              Atlanta, Georgia
            </div>
          </div>

          {/* Sections Grid */}
          <div className="about-sections grid md:grid-cols-2 gap-8 mt-16">
            {/* Experience */}
            <div className="about-section">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((job, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/30"
                  >
                    <h3 className="font-medium text-foreground">{job.title}</h3>
                    <p className="text-sm text-accent">{job.company}</p>
                    <p className="text-xs text-neutral-500 mt-1">{job.period}</p>
                    <p className="text-sm text-neutral-400 mt-2">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="about-section">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-accent" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/30"
                  >
                    <h3 className="font-medium text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-accent">{edu.school}</p>
                    <p className="text-xs text-neutral-500 mt-1">{edu.period}</p>
                    <p className="text-sm text-neutral-400 mt-2">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Button variant="primary" size="lg" href="/contact">
              Get in Touch
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
