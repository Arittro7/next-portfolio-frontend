import React from "react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog/${id}`,
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  const blog = json?.data;

  if (!blog) {
    return {
      title: "Blog Not Found | Arittro",
      description: "The blog you are looking for does not exist.",
    };
  }

  const excerpt = blog.content?.slice(0, 150) + "...";

  return {
    title: `${blog.title} | Arittro`,
    description: excerpt,
    openGraph: {
      title: blog.title,
      description: excerpt,
      images: [blog.thumbnail],
    },
  };
}

export default async function BlogDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog/${id}`,
    {
      next: { revalidate: 10 },
    }
  );
  const json = await res.json();
  const blog = json?.data;

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-6 flex items-center justify-center flex-col mt-20">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
        <p className="mt-2 text-gray-600">
          Sorry, we couldn’t find the blog you’re looking for.
        </p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-6 flex flex-col mt-20">
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt="blog thumbnail"
          className="rounded-md w-full"
        />
      )}
      <h1 className="text-4xl font-bold mt-10 mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-6">{blog.content?.slice(0, 150)}...</p>
      <div className="prose prose-lg max-w-none">
        {blog?.content?.split("\n\n").map((para: string, idx: number) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </article>
  );
}
