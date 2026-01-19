"use client";

import { useState, useCallback, useMemo } from "react";
import { Container, Section } from "@/components/ui";
import { ProjectGrid, ProjectFilter, type FilterState } from "@/components/projects";
import type { Project, ProjectFrontmatter } from "@/lib/projects";

interface ProjectsClientProps {
  initialProjects: Project[];
  availableTags: string[];
  availableTypes: ProjectFrontmatter["type"][];
  availableRoles: ProjectFrontmatter["roles"][number][];
}

export function ProjectsClient({
  initialProjects,
  availableTags,
  availableTypes,
  availableRoles,
}: ProjectsClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: null,
    role: null,
    tags: [],
  });

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project: Project) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          project.stack.some((tech) => tech.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type && project.type !== filters.type) {
        return false;
      }

      // Role filter
      if (filters.role && !project.roles.includes(filters.role)) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const projectTagsLower = project.tags.map((t) => t.toLowerCase());
        const hasAllTags = filters.tags.every((tag) =>
          projectTagsLower.includes(tag.toLowerCase())
        );
        if (!hasAllTags) return false;
      }

      return true;
    });
  }, [filters, initialProjects]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  return (
    <Section animate={false} className="pt-8">
      <Container>
        {/* Page Header */}
        <div className="mb-12">
          <p className="text-accent font-mono text-sm mb-2">My Work</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Projects
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            A collection of web apps, data pipelines, and ML projects. Filter by
            role, technology, or search for something specific.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ProjectFilter
            onFilterChange={handleFilterChange}
            availableTags={availableTags}
            availableTypes={availableTypes}
            availableRoles={availableRoles}
          />
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-neutral-500">
            Showing {filteredProjects.length} of {initialProjects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectGrid projects={filteredProjects} />
      </Container>
    </Section>
  );
}
