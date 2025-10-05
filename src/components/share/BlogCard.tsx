"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Blog } from "@/types";
import { deleteBlog } from "@/app/action/blogAction";
import { BlogForm } from "../dashboard/BlogForm";

function BlogCard({
  blog,
  className,
  isDashboard = false,
}: {
  blog: Blog;
  className?: string;
  isDashboard?: boolean;
}) {
  const handleDelete = async (id: number) => {
    try {
      const ans = await deleteBlog(id);
      if (ans?.success) {
        toast.success("Blog Deleted Successfully");
      } else {
        toast.error(ans?.message || "Failed to delete blog");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      key={blog.id}
      className={`border-2 border-gray-600 shadow-md rounded-2xl flex flex-col cursor-pointer hover:scale-105 duration-300 transition-all relative ${className}`}
    >
      {/* Dashboard Controls */}
      {isDashboard && (
        <div className="absolute top-2 right-2 cursor-pointer gap-4 flex items-center">
          <BlogForm blog={blog} isDashboard={true} />
          <button
            className="bg-red-200 text-black font-bold rounded-sm transition-all cursor-pointer p-2"
            onClick={() => handleDelete(blog.id)}
          >
            <MdDelete size={20} color="red" />
          </button>
        </div>
      )}

      {/* Thumbnail */}
      <img
        className="rounded-t-xl h-[12rem] object-cover overflow-hidden"
        src={blog.thumbnail || "/placeholder.jpg"}
        alt={blog.title}
      />

      {/* Content */}
      <div className="px-6 py-4 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>

        {/* Optional excerpt or first few words of content */}
        <p className="text-gray-400 mb-4">
          {blog.content?.slice(0, 100)}...
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Details Link */}
        <Link
          href={`/blogs/${blog.id}`}
          className="flex items-center justify-center w-full mt-auto p-2 bg-gray-400 text-black font-bold rounded-sm hover:bg-gray-300 transition-all cursor-pointer"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;