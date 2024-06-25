"use client";
import { useEffect, useState } from "react";
import { getBlogs } from "../../server/blogs";
import { BlogPost } from "../../types/blog";
import BlogPreview from "../../components/BlogPreview";
import Link from "next/link";

const Home = () => {
  const [blogData, setBlogData] = useState<BlogPost[]>([]);

  let allTags = blogData.flatMap((item) => item.tags)
  let uniqueTagsMap = new Map();

  allTags.forEach(tag => {
    if (!uniqueTagsMap.has(tag.name)) {
      uniqueTagsMap.set(tag.name, tag);
    }
  });

  allTags = Array.from(uniqueTagsMap.values());


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const updateData = await getBlogs();
        setBlogData(updateData);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    if (blogData.length === 0) {
      fetchBlogs();
    }
  }, [blogData]);

  return (
    <main className="w-screen h-screen flex min-h-screen flex-col items-center p-24 overflow-auto bg-zinc-800 text-neutral-300 font-poppins">
      <title>Home page</title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem]">Welcome to Jun Blogs</h1>
          <p>A Fullstack blog made with Next.Js, TailwindCss, GitHub GraphQL</p>
        </div>
      </section>
      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12">
          {
            allTags.map((tag, idx: number) => {
              return (
                <button key={idx} className="label"
                  style={{ backgroundColor: "#" + tag.color }}>
                  {tag.name}
                </button>
              )
            })
          }
        </div>
        {blogData && blogData.length > 0 ? (
          blogData.map((blog: BlogPost, index) => (
            <div
              key={index}
              className="max-w-[28em] m-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300"
            >
              <Link href={`${blog.url}`} target="_blank" rel="noreferrer">
                <BlogPreview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </Link>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </section>
    </main >
  );
};

export default Home;
