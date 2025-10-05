"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import toast from "react-hot-toast";
import { Blog } from "@/types";
import { MdEdit } from "react-icons/md";
import { createBlogAction, updateBlogAction } from "@/app/action/blogAction";

export const BlogForm = ({ blog, isDashboard }: { blog?: Blog; isDashboard?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    content: "",
    tags: "",
    isFeatured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
    setFormData({
      ...formData,
      [name]: e.target.checked,
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      thumbnail: formData.thumbnail,
      content: formData.content,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      isFeatured: formData.isFeatured,
      authorId: 1, 
    };

    if (isDashboard && blog?.id) {
      const result = await updateBlogAction(blog.id, payload);
      if (result.success) {
        toast.success("Blog Updated Successfully");
        setIsOpen(false);
      } else {
        toast.error(result.message || "Failed to update blog");
      }
    } else {
      const result = await createBlogAction(payload);
      if (result.success) {
        toast.success("Blog Created Successfully");
        setIsOpen(false);
        setFormData({ title: "", thumbnail: "", content: "", tags: "", isFeatured: false });
      } else {
        toast.error(result.error || "Failed to create blog");
      }
    }
  };

  useEffect(() => {
    if (blog && isDashboard) {
      setFormData({
        title: blog.title,
        thumbnail: blog.thumbnail || "",
        content: blog.content,
        tags: blog.tags?.join(", ") || "",
        isFeatured: blog.isFeatured || false,
      });
    }
  }, [blog]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isDashboard ? (
          <button className="bg-green-200 text-black font-bold rounded-sm transition-all cursor-pointer p-2" onClick={() => setIsOpen(true)}>
            <MdEdit size={20} color="green" />
          </button>
        ) : (
          <button className="border rounded-md border-gray-500 hover:border-gray-300 p-2 hover:text-gray-300 hover:scale-105 transition-all cursor-pointer">
            Create Blog
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[800px] h-[80vh] overflow-y-scroll bg-[#0C0F11] text-gray-200 border-gray-800 custom-scroll">
        <DialogHeader className="mx-auto">
          <DialogTitle className="text-xl font-bold">{isDashboard ? "Update" : "Create"} Blog</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:p-4">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 rounded-md border border-gray-600 focus:outline-none focus:border-gray-400"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="p-2 rounded-md border border-gray-600 focus:outline-none focus:border-gray-400"
              placeholder="Enter thumbnail link"
              required
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="p-2 rounded-md border border-gray-600 focus:outline-none focus:border-gray-400"
              placeholder="e.g. react, nextjs, portfolio"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Mark as Featured</label>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="p-2 rounded-md border border-gray-600 focus:outline-none focus:border-gray-400 resize-none"
              placeholder="Write your blog content here..."
              required
            />
          </div>

          <button type="submit" className="p-2 mt-2 bg-gray-600 text-white rounded-md transition-all cursor-pointer">
            Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};