"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function AddProductForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const payload = {
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock, 10),
        attributes: data.attributes ? data.attributes.split(",") : [],
        imageUrl: image
      };

      return await axios.post("/api/products/create-product", payload);
    },
    onSuccess: () => {
      alert("Product added successfully!");
      reset();
      setImage(null);
    },
    onError: (error) => {
      console.error("Error adding product:", error.response?.data || error);
      alert("Error adding product! Check console for details.");
    }
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/products/upload-image", formData);
      setImage(response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(mutation.mutate)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />

        <input
          {...register("price", { required: true })}
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        {errors.price && <p className="text-red-500">Price is required</p>}

        <input
          {...register("stock", { required: true })}
          type="number"
          placeholder="Stock"
          className="w-full p-2 border rounded"
        />
        {errors.stock && <p className="text-red-500">Stock is required</p>}

        <input
          type="text"
          placeholder="Category Name"
          {...register("categoryName", { required: "Category is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.categoryName &&
          <p className="text-red-500">
            {errors.categoryName.message}
          </p>}

        <input
          {...register("attributes")}
          placeholder="Attributes (comma-separated)"
          className="w-full p-2 border rounded"
        />

        <label className="block">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
        />
        {uploading && <p className="text-blue-500">Uploading...</p>}
        {image &&
          <img
            src={image}
            alt="Uploaded"
            className="w-32 h-32 object-cover mt-2"
          />}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
