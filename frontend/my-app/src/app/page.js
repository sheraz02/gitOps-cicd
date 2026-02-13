"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_NODEJS_BACKEND}/api/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        DevOps Blog
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogs.map(blog => (
          <div key={blog.id}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold">
              {blog.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {blog.description}
            </p>

            <p className="text-sm text-gray-400 mt-4">
              By {blog.author}
            </p>

          </div>
        ))}

      </div>

    </main>
  );
}
