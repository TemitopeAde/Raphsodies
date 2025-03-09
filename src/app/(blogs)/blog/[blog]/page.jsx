"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AnimateOnScroll from "@/components/main/AnimateOnScroll"; // Import AnimateOnScroll

const fetchBlogDetail = async (slug) => {
  const response = await fetch(`/api/blog/${slug}`);
  
  if (!response.ok) throw new Error("Failed to fetch blog details");
  return response.json();
};

export default function Page({ params }) {
  const router = useRouter();
  const [blogId, setBlogId] = useState(null);
  
  useEffect(() => {
    (async () => {
      try {
        const resolvedParams = await params; 
        setBlogId(resolvedParams?.blog); 
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    })();
  }, [params]);
  console.log(blogId);

  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlogDetail(blogId),
  });

  return (
    <section className="mx-auto mt-16 py-12 px-6 md:px-10 font-unbounded">
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
        </div>
      )}

      {isError && (
        <AnimateOnScroll animation="fade-up">
          <p className="text-center text-lg text-red-500">Failed to load blog</p>
        </AnimateOnScroll>
      )}

      {!isLoading && !isError && blog && (
        <div className="bg-white rounded-lg overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-[350px] object-cover"
          />
          <div className="p-6 md:p-8 space-y-6">
            <AnimateOnScroll animation="fade-up">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{blog.title}</h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up">
              <p className="text-gray-500 text-sm md:text-base">
                By <span className="font-semibold">{blog.author}</span> • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up">
              <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                {blog.content}
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up">
              <Button onClick={() => router.push("/blog")} className="bg-[#00C898] font-semibold mt-6">
                ← Blogs
              </Button>
            </AnimateOnScroll>
          </div>
        </div>
      )}
    </section>
  );
}