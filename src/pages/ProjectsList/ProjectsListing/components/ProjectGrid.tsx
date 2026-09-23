import ProjectCard from "./ProjectCard";
import type { Project } from "../../types/projectTypes";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({
  projects,
}: ProjectGridProps) {
  return (
    <div
      className={`projects-grid projects-grid-3`}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}