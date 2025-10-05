import Link from "next/link";
import React from "react";
import { Project } from "@/types";
import ProjectCard from "../share/ProjectCard";

async function Projects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
    next: { tags: ["project"] },
    cache: "no-store",
  });

  const json = await res.json();
  const projects: Project[] = json.data || []; // ✅ data থেকে projects নাও

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto md:px-6 py-16 text-center md:text-left flex flex-col items-start"
    >
      <h2 className="text-2xl md:text-4xl font-bold text-center w-full mb-5">
        Featured Projects 💻
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-gray-400">No projects found.</p>
        )}
      </div>

      <Link
        href="/projects"
        className="flex items-center justify-center mt-5 w-full"
      >
        <button className="border-b border-gray-500 hover:border-gray-300 p-2 hover:text-gray-300 hover:scale-105 transition-all cursor-pointer">
          View All
        </button>
      </Link>
    </section>
  );
}

export default Projects;
