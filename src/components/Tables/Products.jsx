'use client'

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ProductForm from "../Dashboard/ProductForm";
import { useProducts } from "@/hooks/admin/useProducts";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    <p className="mt-2 text-sm text-gray-400">Loading products...</p>
  </div>
);

const ProductTable = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { data, isLoading, isError } = useProducts({
    page: 1,
    limit: 10,
    search: "",
    category: null,
    minPrice: null,
    maxPrice: null,
  });

  const products = data?.products || [];

  const handleAddProduct = (product) => {
    products.push({ ...product, id: `PRD00${products.length + 1}` });
  };

  const handleEditProduct = (updatedProduct) => {
    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
    }
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    const index = products.findIndex((p) => p.id === selectedProduct.id);
    if (index !== -1) {
      products.splice(index, 1);
    }
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle className="text-2xl font-semibold">Products</CardTitle>
          <Button className="w-fit" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Create Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {isLoading ? (
              <LoadingSpinner />
            ) : isError ? (
              <p className="text-center text-red-500">Failed to load products</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Image</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Name</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Price</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Category</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Stock</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-800">
                      <td className="px-4 py-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">{product.name}</td>
                      <td className="px-4 py-3 text-sm">${parseFloat(product.price).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">{product.category.name}</td>
                      <td className="px-4 py-3 text-sm">{product.stock} units</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(product)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => openDeleteDialog(product)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      <ProductForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <ProductForm
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onEditProduct={handleEditProduct}
        product={selectedProduct}
        mode="edit"
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-freize text-xl text-white text-center">Delete Product</AlertDialogTitle>
            <AlertDialogDescription className="font-unbounded text-center">
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center !justify-center">
            <AlertDialogCancel className="!text-white" onClick={() => setSelectedProduct(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="!bg-red-500 hover:bg-red-600 !text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductTable;