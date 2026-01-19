"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

interface ProjectGridProps {
  projects: Project[];
  className?: string;
  featured?: boolean;
}

export function ProjectGrid({ projects, className, featured = false }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".project-card-wrapper");

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">No projects found.</p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid gap-6",
        featured
          ? "md:grid-cols-2"
          : "md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {projects.map((project, index) => (
        <div key={project.slug} className="project-card-wrapper">
          <ProjectCard
            project={project}
            index={index}
            featured={featured && index === 0}
          />
        </div>
      ))}
    </div>
  );
}
