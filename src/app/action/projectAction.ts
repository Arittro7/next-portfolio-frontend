"use server";

import { Project } from "@/types";
import { revalidateTag } from "next/cache";

// Create Project
export async function createProject(payload: Project) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      revalidateTag("project");
      return { success: true };
    } else {
      const error = await res.json();
      throw new Error(error.message || "Failed to create project");
    }
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Something went wrong" };
  }
}

// Update Project
export async function updateProject(id: number, payload: Partial<Project>) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      revalidateTag("project");
      return { success: true };
    } else {
      const error = await res.json();
      throw new Error(error.message || "Failed to update project");
    }
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Something went wrong" };
  }
}

// Delete Project
export async function deleteProject(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidateTag("project");
      return { success: true };
    } else {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete project");
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Something went wrong" };
  }
}