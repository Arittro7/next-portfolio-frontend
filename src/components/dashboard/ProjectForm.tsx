/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { createProject, updateProject } from "@/app/action/projectAction";

export default function ProjectForm({ isDashboard = false, project }: { isDashboard?: boolean; project?: Project }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    description: "",
    features: [] as string[],
    liveLink: "",
    githubLink: "",
    techStack: [] as string[],
    category: "",
  });

  useEffect(() => {
    if (project && isDashboard) {
      setForm({
        title: project.title,
        thumbnail: project.thumbnail,
        description: project.description,
        features: project.features || [],
        liveLink: project.liveLink,
        githubLink: project.githubLink,
        techStack: project.techStack || [],
        category: project.category || "",
      });
    }
  }, [project, isDashboard]);

  const [featureInput, setFeatureInput] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function addFeatureFromInput() {
    const val = featureInput.trim();
    if (!val) return;
    setForm((s) => ({ ...s, features: [...s.features, val] }));
    setFeatureInput("");
  }

  function removeFeature(index: number) {
    setForm((s) => ({ ...s, features: s.features.filter((_, i) => i !== index) }));
  }

  function handleFeatureKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addFeatureFromInput();
    }
  }

  function resetForm() {
    setForm({
      title: "",
      thumbnail: "",
      description: "",
      features: [],
      liveLink: "",
      githubLink: "",
      techStack: [],
      category: "",
    });
    setFeatureInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim() || !form.thumbnail.trim() || !form.description.trim() || !form.liveLink.trim() || !form.githubLink.trim()) {
      return toast.error("Title, thumbnail, description, live link and github link are required");
    }

    const payload = { ...form };

    if (isDashboard) {
      handleUpdate(payload);
    } else {
      handleCreate(payload);
    }
  }

  const handleCreate = async (payload: typeof form) => {
    const ans = await createProject(payload as any);

    if (ans?.success) {
      toast.success("Project Created Successfully");
      setOpen(false);
      resetForm();
    } else {
      toast.error(ans?.error || "Failed to create project");
    }
  };

  const handleUpdate = async (payload: typeof form) => {
    if (!project?.id) return toast.error("Project not found");

    const ans = await updateProject(project?.id, payload as any);

    if (ans?.success) {
      toast.success("Project Updated Successfully");
      setOpen(false);
      resetForm();
    } else {
      toast.error(ans?.error || "Failed to update project");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isDashboard ? (
          <button className="bg-green-200 text-black font-bold rounded-sm transition-all cursor-pointer p-2" onClick={() => setOpen(true)}>
            <MdEdit size={20} color="green" />
          </button>
        ) : (
          <button className="border rounded-md border-gray-500 hover:border-gray-300 p-2 hover:text-gray-300 hover:scale-105 transition-all cursor-pointer">Create Project</button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl h-[90vh] max-w-xl bg-[#0C0F11] text-gray-200 border-gray-800 overflow-y-scroll custom-scroll">
        <DialogHeader>
          <DialogTitle className="w-full flex items-center justify-center mb-10 text-xl">{isDashboard ? "Update Project" : "Create Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="MatchHearts" />
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input id="thumbnail" name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://.../image.png" />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Short project description" />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Web App, Mobile App" />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2">
            <Label>Features</Label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {form.features.length === 0 ? <p className="text-sm text-muted-foreground">No features yet</p> : null}
              {form.features.map((f, i) => (
                <Badge key={i} variant="secondary" className="inline-flex items-center gap-2">
                  <span>{f}</span>
                  <button type="button" onClick={() => removeFeature(i)} className="ml-2 text-xs opacity-80">✕</button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={handleFeatureKey} placeholder="Type a feature and press Enter" />
              <Button type="button" onClick={addFeatureFromInput}>Add</Button>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-2">
            <Label>Select Tech Stack</Label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 my-2">
              {tech.map((t, i) => {
                const isSelected = form.techStack.includes(t);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setForm((prev) => {
                        const alreadySelected = prev.techStack.includes(t);
                        return {
                          ...prev,
                          techStack: alreadySelected ? prev.techStack.filter((item) => item !== t) : [...prev.techStack, t],
                        };
                      });
                    }}
                    className={`py-3 cursor-pointer border rounded-xl flex items-center justify-center transition-all hover:scale-105 
                      ${isSelected ? "bg-gray-700 border-gray-500" : "bg-transparent border-gray-600"}`}
                  >
                    <img src={t} alt="tech icon" className="w-10 h-10 object-contain" />
                  </button>
                );
              })}
            </div>
            {form.techStack.length > 0 && <p className="text-sm text-gray-400">{form.techStack.length} technologies selected</p>}
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="liveLink">Live URL</Label>
              <Input
                className="p-2 h-10 rounded-md border border-gray-600 focus:outline-none focus:border-gray-400"
                id="liveLink"
                name="liveLink"
                value={form.liveLink}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="githubLink">GitHub URL</Label>
              <Input
                className="p-2 h-10 rounded-md border border-gray-600 focus:outline-none focus:border-gray-400"
                id="githubLink"
                name="githubLink"
                value={form.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/arittro/your-repo"
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex items-center justify-end w-full mt-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    resetForm();
                  }}
                  className="cursor-pointer w-28"
                >
                  Cancel
                </Button>
                <Button type="submit" className="cursor-pointer w-28">
                  {isDashboard ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// icons will add later on public
const tech = [
  "/tech/react.png",
  "/tech/nextjs.png",
  "/tech/typescript.png",
  "/tech/node.png",
  "/tech/express.png",
  "/tech/prisma.png",
  "/tech/mongodb.png",
  "/tech/tailwind.png",
];