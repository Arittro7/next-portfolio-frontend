import ProjectCard from "@/components/share/ProjectCard";
import { Project } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Arittro's Portfolio || My Projects",
  description: "Arittro's Portfolio",
};

async function ProjectPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
    next: { tags: ["project"] },
    cache: "no-store",
  });

  const json = await res.json();
  const projects: Project[] = json.data;

  return (
    <div>
      <h1 className="flex items-center justify-center py-10 text-3xl font-bold">
        My Projects
      </h1>
      <div className="flex flex-wrap items-start gap-8 pb-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            className="w-full md:w-[20rem] lg:w-[25rem] xl:w-[26rem]"
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
