"use client";

import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface TagListProps {
  tags: string[];
  limit?: number;
  className?: string;
  size?: "sm" | "md";
}

export function TagList({ tags, limit, className, size = "sm" }: TagListProps) {
  const displayTags = limit ? tags.slice(0, limit) : tags;
  const remaining = limit ? tags.length - limit : 0;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {displayTags.map((tag) => (
        <Badge key={tag} variant="default" size={size}>
          {tag}
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge variant="muted" size={size}>
          +{remaining}
        </Badge>
      )}
    </div>
  );
}
