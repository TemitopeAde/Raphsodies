"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductForm = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const ORIGIN="https://raphsodies.vercel.app"

  const uploadImage = async imageFile => {
    console.log("uploading");
    
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(
      `${ORIGIN}/api/products/upload-image`,
      {
        method: "POST",
        body: formData
      }
    );

    console.log({response});
    
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.url; 
  };

  const createProduct = async data => {
    const imageUrl = await uploadImage(data.image[0]);

    const productData = {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      label: data.label,
      categoryName: data.category,
      image: imageUrl
    };

    const response = await fetch(
      "http://localhost:3000/api/products/create-product",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast({
        title: "Product added successfully!",
        description: "The product has been created."
      });
      reset();
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = data => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] font-freize max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex justify-between flex-row">
          <DialogTitle className="text-white">Add Product</DialogTitle>
          <X
            className="cursor-pointer text-gray-400 hover:text-white"
            onClick={onClose}
          />
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Product name is required" })}
            />
            {errors.name &&
              <p className="text-red-500 text-sm">
                {errors.name.message}
              </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description", {
                required: "Description is required"
              })}
            />
            {errors.description &&
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required", min: 0 })}
            />
            {errors.price &&
              <p className="text-red-500 text-sm">
                {errors.price.message}
              </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              {...register("stock", { required: "Stock is required", min: 0 })}
            />
            {errors.stock &&
              <p className="text-red-500 text-sm">
                {errors.stock.message}
              </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input id="label" {...register("label")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category &&
              <p className="text-red-500 text-sm">
                {errors.category.message}
              </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  uploadImage(e.target.files[0])
                    .then((url) => {
                      setValue("imageUrl", url); // Store the image URL in the form
                    })
                    .catch((error) => {
                      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
                    });
                }
              }}
            />
            {errors.image &&
              <p className="text-red-500 text-sm">
                {errors.image.message}
              </p>}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
