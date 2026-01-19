"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Users,
  Zap,
} from "lucide-react";
import { Container, Button, Badge, TagList } from "@/components/ui";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  project: Project;
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

export function ProjectDetail({ project }: ProjectDetailProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    // Hero animation
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
      .fromTo(
        ".back-button",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5 }
      )
      .fromTo(
        ".project-badges",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".project-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        ".project-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".project-meta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".project-links",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );

    // Content sections animation
    gsap.fromTo(
      ".content-section",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-area",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Sidebar animation
    gsap.fromTo(
      ".sidebar-item",
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sidebar",
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={pageRef} className="py-8">
      <Container>
        {/* Back Button */}
        <Link
          href="/projects"
          className="back-button inline-flex items-center gap-2 text-neutral-400 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          {/* Badges */}
          <div className="project-badges flex flex-wrap items-center gap-2 mb-4">
            <Badge variant={statusColors[project.status]}>
              {project.status}
            </Badge>
            <Badge variant="muted">{typeLabels[project.type]}</Badge>
            {project.roles.map((role) => (
              <Badge key={role} variant="default">
                {role}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="project-title text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {project.title}
          </h1>

          {/* Description */}
          <p className="project-description text-xl text-neutral-400 max-w-3xl mb-6">
            {project.description}
          </p>

          {/* Meta */}
          <div className="project-meta flex flex-wrap items-center gap-6 text-sm text-neutral-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {project.dates.start} — {project.dates.end}
            </div>
            {project.metrics?.accuracy && (
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                {project.metrics.accuracy} accuracy
              </div>
            )}
            {project.metrics?.latency && (
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                {project.metrics.latency} latency
              </div>
            )}
          </div>

          {/* Links */}
          <div className="project-links flex flex-wrap gap-3">
            {project.links.github && (
              <Button variant="secondary" href={project.links.github} external>
                <Github className="h-4 w-4" />
                View Source
              </Button>
            )}
            {project.links.live && (
              <Button variant="primary" href={project.links.live} external>
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            )}
            {project.links.paper && (
              <Button variant="outline" href={project.links.paper} external>
                Read Paper
              </Button>
            )}
          </div>
        </div>

        {/* Hero Image */}
        {project.screens?.hero && (
          <div className="relative aspect-video mb-12 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <Image
              src={project.screens.hero}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2 content-area">
            <article className="prose prose-invert prose-neutral max-w-none">
              {/* Render MDX content sections */}
              <div className="space-y-8">
                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="content-section">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Key Highlights
                    </h2>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-neutral-300"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Content from MDX */}
                <div className="content-section prose-headings:text-foreground prose-p:text-neutral-400 prose-strong:text-foreground prose-li:text-neutral-400">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.content
                        .split("\n")
                        .map((line) => {
                          if (line.startsWith("## ")) {
                            return `<h2 class="text-2xl font-bold text-foreground mt-8 mb-4">${line.slice(
                              3
                            )}</h2>`;
                          }
                          if (line.startsWith("**") && line.endsWith("**")) {
                            return `<p class="font-semibold text-foreground mt-4">${line.slice(
                              2,
                              -2
                            )}</p>`;
                          }
                          if (line.startsWith("- ")) {
                            return `<li class="text-neutral-400 ml-4">${line.slice(
                              2
                            )}</li>`;
                          }
                          if (line.trim()) {
                            return `<p class="text-neutral-400 leading-relaxed">${line}</p>`;
                          }
                          return "";
                        })
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="sidebar lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Tech Stack */}
              <div className="sidebar-item p-6 rounded-xl border border-neutral-800 bg-neutral-900/50">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-accent" />
                  Tech Stack
                </h3>
                <TagList tags={project.stack} size="md" />
              </div>

              {/* Tags */}
              <div className="sidebar-item p-6 rounded-xl border border-neutral-800 bg-neutral-900/50">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Tags
                </h3>
                <TagList tags={project.tags} size="sm" />
              </div>

              {/* Metrics */}
              {project.metrics && Object.keys(project.metrics).length > 0 && (
                <div className="sidebar-item p-6 rounded-xl border border-neutral-800 bg-neutral-900/50">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    Metrics
                  </h3>
                  <dl className="space-y-3">
                    {project.metrics.accuracy && (
                      <div>
                        <dt className="text-xs text-neutral-500">Accuracy</dt>
                        <dd className="text-lg font-semibold text-accent">
                          {project.metrics.accuracy}
                        </dd>
                      </div>
                    )}
                    {project.metrics.latency && (
                      <div>
                        <dt className="text-xs text-neutral-500">Latency</dt>
                        <dd className="text-lg font-semibold text-accent">
                          {project.metrics.latency}
                        </dd>
                      </div>
                    )}
                    {project.metrics.users && (
                      <div>
                        <dt className="text-xs text-neutral-500">Users</dt>
                        <dd className="text-lg font-semibold text-accent">
                          {project.metrics.users}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
