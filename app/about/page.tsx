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
    title: "Graduate Teaching Fellow — Python",
    company: "Georgia State University",
    period: "August 2024 – Present",
    description:
      "Teaching Python fundamentals to students from non-technical backgrounds. Designing and grading assignments aligned with course objectives and measurable learning outcomes.",
  },
  {
    title: "IT Intern",
    company: "WellStar HealthCare System",
    period: "August 2023 – August 2024",
    description:
      "Provided technical support for hardware and software, maintained network infrastructure, and performed computer imaging and deployment for standardized IT operations in a healthcare environment.",
  },
];

const education = [
  {
    degree: "M.S. Computer Science",
    school: "Georgia State University",
    period: "Expected May 2026",
    details: "GPA: 4.0 — Focus on data mining, machine learning, and applied analytics.",
  },
  {
    degree: "B.S. Computer Science",
    school: "Georgia State University",
    period: "December 2024",
    details: "GPA: 3.63 — Data structures, algorithms, databases, web development.",
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

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
                I&apos;m a Computer Science Master&apos;s student at Georgia State University
                with a focus on applied machine learning, data pipelines, and building
                production web applications from end to end.
              </p>
              <p>
                My work consistently sits at the intersection of messy data and operational
                clarity. I enjoy taking imperfect datasets, identifying what&apos;s actually
                learnable, and building systems that produce reliable, explainable results.
                On the web side, I care most about outcomes: interfaces that feel intuitive,
                APIs that behave predictably, and code that other developers can understand.
              </p>
              <p>
                Across projects, my approach is consistent: understand the data-generating
                process, validate assumptions early, and design systems that others can
                reason about and extend. I&apos;m comfortable collaborating with engineers and
                non-technical stakeholders, presenting results clearly, and iterating
                quickly when requirements change.
              </p>
              <p>
                Currently working as a Graduate Teaching Fellow, teaching Python to
                students from non-technical backgrounds. Previously interned at WellStar
                HealthCare System handling IT infrastructure in a healthcare environment.
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
