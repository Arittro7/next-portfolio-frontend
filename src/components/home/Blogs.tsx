import Link from "next/link";
import React from "react";
import BlogCard from "../share/BlogCard";
import { Blog } from "@/types";

async function Blogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog`, {
    next: { tags: ["blog"] },
    cache: "no-store",
  });

  const json = await res.json();
  const blogs: Blog[] = json.data || []; 

  return (
    <section className="max-w-7xl mx-auto md:px-6 py-16 text-center md:text-left flex flex-col items-start">
      <h2 className="text-2xl md:text-4xl font-bold text-center w-full mb-5">
        My Blog Posts 📝
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-5">
        {blogs.length > 0 ? (
          blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <p className="text-gray-400">No blogs found.</p>
        )}
      </div>

      <Link
        href="/blogs"
        className="flex items-center justify-center mt-5 w-full"
      >
        <button className="border-b border-gray-500 hover:border-gray-300 p-2 hover:text-gray-300 hover:scale-105 transition-all cursor-pointer">
          View All
        </button>
      </Link>
    </section>
  );
}

export default Blogs;
