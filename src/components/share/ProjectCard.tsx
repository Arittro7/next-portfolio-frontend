"use client";
import Link from "next/link";
import React from "react";
import DialogModel from "../home/DialogModel";
import { Project } from "@/types";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { deleteProject } from "@/app/action/projectAction";
import ProjectForm from "../dashboard/ProjectForm";

function ProjectCard({
  project,
  className,
  isDashboard,
}: {
  project: Project;
  className?: string;
  isDashboard?: boolean;
}) {
  const handleDelete = async (id: number) => {
    const ans = await deleteProject(id);

    if (ans?.success) {
      toast.success("Project Deleted Successfully");
    } else {
      toast.error(ans?.error || "Failed to delete project");
    }
  };

  return (
    <div
      className={`border-2 border-gray-600 rounded-xl flex flex-col cursor-pointer hover:scale-105 duration-300 transition-all relative ${className}`}
    >
      {/* Dashboard Controls */}
      {isDashboard && (
        <div className="absolute top-2 right-2 cursor-pointer gap-4 flex items-center">
          <ProjectForm isDashboard={true} project={project} />
          <button
            className="bg-red-200 text-black font-bold rounded-sm transition-all cursor-pointer p-2"
            onClick={() => handleDelete(project.id!)}
          >
            <MdDelete size={20} color="red" />
          </button>
        </div>
      )}

      {/* Thumbnail */}
      <img className="rounded-t-xl h-[12rem] object-cover" src={project.thumbnail} alt="project thumbnail" />

      {/* Content */}
      <div className="p-2 flex flex-col flex-grow">
        <h1 className="font-semibold text-xl">{project.title}</h1>

        <div className="pt-4">
          <h1 className="font-semibold text-gray-400">Technologies:</h1>
          <div className="flex items-center gap-2 py-2 flex-wrap">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 pt-4 mt-auto">
          <Link
            className="text-gray-500 hover:text-gray-300 font-semibold border-2 border-gray-500 hover:border-gray-300 px-3 py-2 rounded-xl"
            href={project.liveLink}
            target="_blank"
          >
            Live
          </Link>
          <Link
            className="text-gray-500 hover:text-gray-300 font-semibold border-2 border-gray-500 hover:border-gray-300 px-3 py-2 rounded-xl"
            href={project.githubLink}
            target="_blank"
          >
            GitHub
          </Link>
        </div>

        {/* Dialog Preview */}
        <DialogModel data={project} />
      </div>
    </div>
  );
}

export default ProjectCard;