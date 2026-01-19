import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  type: "web" | "fullstack" | "data" | "ml" | "research" | "devops";
  roles: ("frontend" | "backend" | "data" | "ml" | "infra")[];
  status: "live" | "demo" | "private" | "archived";
  featured: boolean;
  stack: string[];
  highlights: string[];
  links: {
    github?: string;
    live?: string;
    paper?: string;
    video?: string;
  };
  dates: {
    start: string;
    end: string;
  };
  metrics?: {
    users?: number | string;
    latency?: string;
    accuracy?: string;
    revenue?: string;
  };
  screens?: {
    hero?: string;
    gallery?: string[];
  };
  tags: string[];
  description: string;
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  const files = fs.readdirSync(projectsDirectory);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getProjectBySlug(slug: string): Project | null {
  const mdxPath = path.join(projectsDirectory, `${slug}.mdx`);
  const mdPath = path.join(projectsDirectory, `${slug}.md`);

  let fullPath = "";
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...(data as ProjectFrontmatter),
    content,
  };
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      // Sort by featured first, then by end date
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.dates.end).getTime() - new Date(a.dates.end).getTime();
    });

  return projects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getProjectsByType(type: ProjectFrontmatter["type"]): Project[] {
  return getAllProjects().filter((project) => project.type === type);
}

export function getProjectsByRole(role: ProjectFrontmatter["roles"][number]): Project[] {
  return getAllProjects().filter((project) => project.roles.includes(role));
}

export function getProjectsByTag(tag: string): Project[] {
  return getAllProjects().filter((project) =>
    project.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const projects = getAllProjects();
  const tags = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag.toLowerCase()));
  });
  return Array.from(tags).sort();
}

export function getAllTypes(): ProjectFrontmatter["type"][] {
  return ["web", "fullstack", "data", "ml", "research", "devops"];
}

export function getAllRoles(): ProjectFrontmatter["roles"][number][] {
  return ["frontend", "backend", "data", "ml", "infra"];
}
