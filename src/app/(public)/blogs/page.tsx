// src/app/(public)/blogs/page.tsx
import BlogCard from "@/components/share/BlogCard";
import { Blog } from "@/types";

export const metadata = {
  title: "Arittro's Portfolio || Blogs",
  description: "All blog posts by Arittro",
};

export default async function BlogsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
    cache: "no-store",
  });
  const json = await res.json();
  const blogs: Blog[] = json.data || [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-10">All Blogs</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <p className="text-gray-400">No blogs found.</p>
        )}
      </div>
    </div>
  );
}

// import BlogCard from "@/components/share/BlogCard";
// import { Blog } from "@/types";
// import React from "react";

// export const metadata = {
//   title: "Arittro's Portfolio || My Blogs",
//   description: "Arittro's Portfolio",
// };

// async function Page() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
//     next: { tags: ["blog"] },
//     cache: "no-store",
//   });

//   const json = await res.json();
//   const blogs: Blog[] = json.data || [];

//   return (
//     <div>
//       <h1 className="flex items-center justify-center py-10 text-3xl font-bold">
//         My Blogs
//       </h1>
//       <div className="flex flex-wrap items-center justify-center 2xl:justify-start gap-8 pb-5">
//         {blogs.length > 0 ? (
//           blogs.map((blog) => (
//             <BlogCard
//               key={blog.id}
//               blog={blog}
//               className="w-full md:w-[20rem] lg:w-[25rem] xl:w-[26rem]"
//             />
//           ))
//         ) : (
//           <p className="text-gray-400">No blogs found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Page;
