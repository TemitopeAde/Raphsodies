"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const BlogCreate = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const title = watch("title");

  const generateSlug = (title) => {
    return title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "";
  };

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3000/api/products/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image");
      }
      return data.url;
    },
  });

  const blogMutation = useMutation({
    mutationFn: async (blogData) => {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create blog");
      }
      return data;
    },
  });

  const handleImageUpload = async (file) => {
    if (!file) return;
    try {
      setImagePreview(URL.createObjectURL(file));
      const imageUrl = await uploadMutation.mutateAsync(file);
      setValue("image", imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", "");
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a Blog</h1>
      <form onSubmit={handleSubmit((data) => blogMutation.mutate({ ...data, slug: generateSlug(data.title) }))} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className="w-full p-2 border rounded"
          onChange={(e) => setValue("slug", generateSlug(e.target.value))}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <textarea
          placeholder="Content"
          {...register("content", { required: "Content is required" })}
          className="w-full p-2 border rounded"
          rows="4"
        />
        {errors.content && <p className="text-red-500">{errors.content.message}</p>}

        <input
          type="text"
          placeholder="Author"
          {...register("author", { required: "Author is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.author && <p className="text-red-500">{errors.author.message}</p>}

        <div
          className="w-full p-4 border-2 border-dashed rounded-lg text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Uploaded" className="w-full h-40 object-cover rounded" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ) : (
            <p>Click or Drag & Drop to Upload Image</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={blogMutation.isLoading}
        >
          {blogMutation.isLoading ? "Submitting..." : "Submit"}
        </button>

        {blogMutation.isSuccess && <p className="text-green-500">Blog created successfully!</p>}
        {blogMutation.isError && <p className="text-red-500">{blogMutation.error?.message}</p>}
      </form>
    </div>
  );
};

export default BlogCreate;
