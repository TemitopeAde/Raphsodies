"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BlogManagement = () => {
  const [editingBlog, setEditingBlog] = useState(null);
  const queryClient = useQueryClient();

  // Fetch all blogs
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch("/api/blog");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      return response.json();
    }
  });

  // Delete blog mutation
  const deleteMutation = useMutation({
    mutationFn: async (blogId) => {
      const response = await fetch(`/api/blog/${blogId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    }
  });

  // Update blog mutation
  const updateMutation = useMutation({
    mutationFn: async (blogData) => {
      const response = await fetch(`/api/blog/${blogData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update blog");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setEditingBlog(null);
    }
  });

  const handleDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteMutation.mutate(blogId);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog({...blog});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate(editingBlog);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBlog({
      ...editingBlog,
      [name]: value
    });
  };

  const cancelEdit = () => {
    setEditingBlog(null);
  };

  if (isLoading) return <div className="text-center p-4">Loading blogs...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      
      {editingBlog ? (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2">Edit Blog</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="title"
              value={editingBlog.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Title"
              required
            />
            
            <textarea
              name="content"
              value={editingBlog.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Content"
              required
            />
            
            <input
              type="text"
              name="author"
              value={editingBlog.author}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Author"
              required
            />
            
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
                disabled={updateMutation.isLoading}
              >
                {updateMutation.isLoading ? "Updating..." : "Update Blog"}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
            
            {updateMutation.isError && (
              <p className="text-red-500">{updateMutation.error.message}</p>
            )}
          </form>
        </div>
      ) : null}
      
      <div className="space-y-4">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-sm text-gray-500">By {blog.author}</p>
                  <p className="mt-2">{blog.content.substring(0, 150)}...</p>
                </div>
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-20 h-20 object-cover rounded ml-4"
                  />
                )}
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No blogs found. Create your first blog.</p>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;