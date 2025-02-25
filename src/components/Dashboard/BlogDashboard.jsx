"use client";

import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogCreate from "./createBlog";
import BlogManagement from "./BlogManagement";

const queryClient = new QueryClient();

const BlogDashboard = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">Blog Dashboard</h1>
        
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "create"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("create")}
            >
              Create Blog
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "manage"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("manage")}
            >
              Manage Blogs
            </button>
          </div>
        </div>
        
        {activeTab === "create" ? <BlogCreate /> : <BlogManagement />}
      </div>
    </QueryClientProvider>
  );
};

export default BlogDashboard;