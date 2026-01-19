import { getAllProjects, getAllTags, getAllTypes, getAllRoles } from "@/lib/projects";
import { ProjectsClient } from "./ProjectsClient";

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const allTags = getAllTags();
  const allTypes = getAllTypes();
  const allRoles = getAllRoles();

  return (
    <ProjectsClient
      initialProjects={allProjects}
      availableTags={allTags}
      availableTypes={allTypes}
      availableRoles={allRoles}
    />
  );
}
