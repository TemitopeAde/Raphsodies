"use client";

import Link from "next/link";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react"; // ShadCN loader icon
import AnimateOnScroll from "@/components/main/AnimateOnScroll"; // Import AnimateOnScroll

const queryClient = new QueryClient();

const fetchBlogs = async () => {
  const response = await fetch("/api/blog");
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json();
};

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogPage />
    </QueryClientProvider>
  );
}

function BlogPage() {
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <section className="gap-16 pt-36 pb-8 px-4 bg-custom-bg flex flex-col justify-center text-center">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-unbounded font-bold text-[28px]">
              Unlock the Secrets to Radiant Skin
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up">
            <p className="font-freize text-[15px] font-normal">
              Discover tips, trends, and must-have products for the glowing skin you’ve always wanted!
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
        </div>
      )}
      
      {isError && (
        <AnimateOnScroll animation="fade-up">
          <p className="text-center text-lg text-red-500">Failed to load blogs</p>
        </AnimateOnScroll>
      )}

      {!isLoading && !isError && (
        <div className="flex flex-col lg:flex-row justify-around lg:w-[80%] mx-auto gap-10">
          {blogs.map((item) => (
            <div key={item.id} className="w-full flex flex-col text-center gap-4">
              <img src={item.image} alt={item.title} className="w-full rounded-lg shadow-md h-96" />
              <AnimateOnScroll animation="fade-up">
                <Link href={`/blog/${item.id}`} className="font-unbounded font-bold lg:text-[26px] lg:leading-[37px] hover:underline">
                  {item.title}
                </Link>
              </AnimateOnScroll>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}