"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Container, Section, Button } from "@/components/ui";
import { ProjectGrid } from "@/components/projects";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate section title
    gsap.fromTo(
      sectionRef.current.querySelector(".section-header"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Animate the decorative line
    gsap.fromTo(
      sectionRef.current.querySelector(".section-line"),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <Container>
        {/* Section Header */}
        <div className="section-header mb-12">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="text-accent font-mono text-sm mb-2">Featured Work</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Selected Projects
              </h2>
            </div>
            <Button
              variant="ghost"
              href="/projects"
              className="hidden md:inline-flex"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="section-line h-px bg-gradient-to-r from-accent/50 via-neutral-800 to-transparent origin-left" />
        </div>

        {/* Projects Grid */}
        <ProjectGrid projects={projects} featured />

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" href="/projects">
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
