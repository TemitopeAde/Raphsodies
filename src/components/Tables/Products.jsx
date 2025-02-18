'use client'

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, ChevronLeft } from "lucide-react";
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
import { useDeleteProduct } from "@/hooks/admin/useDeleteProduct";
import { toast } from 'react-toastify';
import { useSingleProduct } from "@/hooks/admin/useSingleProduct";
import { isPending } from "@reduxjs/toolkit";
import EditProductForm from "../Dashboard/EditProductForm";
import { Input } from "../ui/input";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    
  </div>
);

const ProductTable = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState("")
  const [productsData, setProductsData] = useState({}) 

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  
  const { data, isLoading, isError } = useProducts({
    page,
    limit,
    search: searchTerm,
    minPrice: minPrice || null,
    maxPrice: maxPrice || null,
  });

  const products = data?.products.products || [];
  const totalPages = data?.totalPages || 1;
  console.log(products);
  
  const handleAddProduct = (product) => {
    products.push({ ...product, id: `PRD00${products.length + 1}` });
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const handlePageChange = (newPage) => setPage(newPage);

  const handleEditProduct = (updatedProduct) => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const { data: singleData, isPending: singlePending, isError: singleError } = useSingleProduct(productId)


  useEffect(() => {
    if (singleData) {
      setProductsData(singleData?.product);
    }
  }, [singleData]); 
  
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    deleteProduct(selectedProduct.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setSelectedProduct(null);

        toast.success('Product deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      },
    });
  };

  const openEditModal = (product) => {
    setProductId(product.id)
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

        <div className="flex gap-4 mb-4">
            <Input
              type="text"
              
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Input
              type="number"
              step="1"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="Min Price"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <Input
              step="1"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <LoadingSpinner />
            ) : isError ? (
              <p className="text-center text-red-500">Failed to load products</p>
            ) : (
              <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                  <th className="border-b border-gray-300 px-4 py-3 text-left">#</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Image</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Name</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Price (₦)</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Price ($)</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Category</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Stock</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, index) => (
                    <tr key={product.id} className="border-b hover:bg-gray-800">
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">{product.name}</td>
                      <td className="px-4 py-3 text-sm">₦{parseFloat(product?.price).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">${parseFloat(product?.priceDollar).toFixed(2)}</td>
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
              <div className="flex justify-center items-center mt-4">
                  <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
                    <ChevronDoubleLeftIcon />
                  </Button>
                  <span className="px-4">Page {page} of {totalPages}</span>
                  <Button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
                    <ChevronDoubleRightIcon />
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <ProductForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <EditProductForm
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onEditProduct={handleEditProduct}
        product={productsData}
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