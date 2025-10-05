import ProjectForm from "@/components/dashboard/ProjectForm";
import ProjectCard from "@/components/share/ProjectCard";
import { Project } from "@/types";
import React from "react";

export const metadata = {
  title: "Arittro's Portfolio || dashboard-project",
  description: "Arittro's Portfolio || dashboard-project",
};

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
    next: { tags: ["project"] },
    cache: "no-store",
  });

  const json = await res.json();
  const projects: Project[] = json.data;

  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold text-center w-full mb-5">
        My Projects 💻
      </h2>

      <div className="flex items-center justify-center mt-5 mb-10 w-full">
        <ProjectForm />
      </div>

      <div className="flex flex-wrap items-center justify-center 2xl:justify-start gap-8 pb-5">
        {projects.map((project) => (
          <ProjectCard
            isDashboard={true}
            key={project.id}
            project={project}
            className="w-full md:w-[20rem] lg:w-[25rem] xl:w-[26rem]"
          />
        ))}
      </div>
    </div>
  );
}
