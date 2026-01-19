"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Card, Badge, TagList } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

const statusColors = {
  live: "success",
  demo: "accent",
  private: "warning",
  archived: "muted",
} as const;

const typeLabels = {
  web: "Web App",
  fullstack: "Full Stack",
  data: "Data",
  ml: "ML/AI",
  research: "Research",
  devops: "DevOps",
} as const;

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    // Hover animation setup
    const card = cardRef.current;
    const image = card.querySelector(".project-image");
    const arrow = card.querySelector(".arrow-icon");

    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(arrow, {
        x: 4,
        y: -4,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(arrow, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Link href={`/projects/${project.slug}`}>
      <Card
        ref={cardRef}
        className={cn(
          "group relative overflow-hidden cursor-pointer h-full",
          featured && "md:col-span-2"
        )}
      >
        {/* Image */}
        {project.screens?.hero && (
          <div className="relative aspect-video mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl bg-neutral-800">
            <Image
              src={project.screens.hero}
              alt={project.title}
              fill
              className="project-image object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={statusColors[project.status]} size="sm">
                  {project.status}
                </Badge>
                <Badge variant="muted" size="sm">
                  {typeLabels[project.type]}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                {project.title}
                <ArrowUpRight className="arrow-icon h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-400 line-clamp-2">
            {project.description}
          </p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-1">
              {project.highlights.slice(0, 2).map((highlight, i) => (
                <li
                  key={i}
                  className="text-xs text-neutral-500 flex items-start gap-2"
                >
                  <span className="text-accent mt-1">•</span>
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tags */}
          <TagList tags={project.stack} limit={4} />

          {/* Links */}
          <div className="flex items-center gap-3 pt-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-500 hover:text-foreground transition-colors"
                aria-label="View source on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-500 hover:text-foreground transition-colors"
                aria-label="View live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <span className="ml-auto text-xs text-neutral-600">
              {project.dates.start} — {project.dates.end}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
