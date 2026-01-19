"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Search, X, Filter } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ProjectFrontmatter } from "@/lib/projects";

interface ProjectFilterProps {
  onFilterChange: (filters: FilterState) => void;
  availableTags: string[];
  availableTypes: ProjectFrontmatter["type"][];
  availableRoles: ProjectFrontmatter["roles"][number][];
}

export interface FilterState {
  search: string;
  type: ProjectFrontmatter["type"] | null;
  role: ProjectFrontmatter["roles"][number] | null;
  tags: string[];
}

const typeLabels: Record<ProjectFrontmatter["type"], string> = {
  web: "Web App",
  fullstack: "Full Stack",
  data: "Data",
  ml: "ML/AI",
  research: "Research",
  devops: "DevOps",
};

const roleLabels: Record<ProjectFrontmatter["roles"][number], string> = {
  frontend: "Frontend",
  backend: "Backend",
  data: "Data",
  ml: "ML",
  infra: "Infrastructure",
};

export function ProjectFilter({
  onFilterChange,
  availableTags,
  availableTypes,
  availableRoles,
}: ProjectFilterProps) {
  const filterRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: null,
    role: null,
    tags: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  useGSAP(() => {
    if (!filterRef.current) return;

    gsap.fromTo(
      filterRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      type: null,
      role: null,
      tags: [],
    });
  };

  const hasActiveFilters =
    filters.search || filters.type || filters.role || filters.tags.length > 0;

  return (
    <div ref={filterRef} className="space-y-4">
      {/* Search and Toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-foreground placeholder:text-neutral-500 focus:outline-none focus:border-accent/50 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant={showFilters ? "secondary" : "outline"}
          size="md"
          onClick={() => setShowFilters(!showFilters)}
          className="shrink-0"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-accent/20 text-accent rounded">
              {(filters.type ? 1 : 0) +
                (filters.role ? 1 : 0) +
                filters.tags.length}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg space-y-4">
          {/* Type Filter */}
          <div>
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2 block">
              Project Type
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTypes.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    updateFilter("type", filters.type === type ? null : type)
                  }
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md border transition-colors",
                    filters.type === type
                      ? "bg-accent/10 border-accent/30 text-accent"
                      : "border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
                  )}
                >
                  {typeLabels[type]}
                </button>
              ))}
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2 block">
              Role
            </label>
            <div className="flex flex-wrap gap-2">
              {availableRoles.map((role) => (
                <button
                  key={role}
                  onClick={() =>
                    updateFilter("role", filters.role === role ? null : role)
                  }
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md border transition-colors",
                    filters.role === role
                      ? "bg-accent/10 border-accent/30 text-accent"
                      : "border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
                  )}
                >
                  {roleLabels[role]}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2 block">
              Technologies
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-md border transition-colors",
                    filters.tags.includes(tag)
                      ? "bg-accent/10 border-accent/30 text-accent"
                      : "border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-neutral-800">
              <button
                onClick={clearFilters}
                className="text-sm text-neutral-400 hover:text-foreground transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && !showFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-neutral-500">Active filters:</span>
          {filters.type && (
            <Badge
              variant="accent"
              className="cursor-pointer"
              onClick={() => updateFilter("type", null)}
            >
              {typeLabels[filters.type]}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {filters.role && (
            <Badge
              variant="accent"
              className="cursor-pointer"
              onClick={() => updateFilter("role", null)}
            >
              {roleLabels[filters.role]}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {filters.tags.map((tag) => (
            <Badge
              key={tag}
              variant="accent"
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
