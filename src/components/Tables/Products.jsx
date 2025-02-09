'use client'

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  Plus,
  X,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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

const ProductTable = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [products, setProducts] = useState([
    {
      id: "PRD001",
      name: "Wireless Headphones",
      price: 129.99,
      category: "Electronics",
      stock: 45,
      image: "http://res.cloudinary.com/dtdpgrdhr/image/upload/v1738824311/uploads/1738824304913_Rectangle_41.png"
    },
    {
      id: "PRD002",
      name: "Running Shoes",
      price: 89.99,
      category: "Sports",
      stock: 23,
      image: "http://res.cloudinary.com/dtdpgrdhr/image/upload/v1738824311/uploads/1738824304913_Rectangle_41.png"
    },
    {
      id: "PRD003",
      name: "Coffee Maker",
      price: 199.99,
      category: "Appliances",
      stock: 12,
      image: "http://res.cloudinary.com/dtdpgrdhr/image/upload/v1738824311/uploads/1738824304913_Rectangle_41.png"
    }
  ]);

  const handleEditClick = (product) => {
    setSelectedProduct({...product});
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => 
      p.id === selectedProduct.id ? selectedProduct : p
    );
    setProducts(updatedProducts);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
    setProducts(updatedProducts);
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const getStockLevelColor = (stock) => {
    if (stock <= 10) return 'text-red-600 bg-red-100';
    if (stock <= 25) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  // ... (keep all the existing JSX until the table actions cell)

  return (
    <>
      <Card className="w-full">
        {/* ... (keep existing header and content until the actions cell in the table) */}
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* ... (keep existing thead) */}
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-800 cursor-pointer">
                    
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-white">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-white">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-white">{product.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockLevelColor(product.stock)}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(product)}>Edit</Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteClick(product)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] font-freize">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 text-white">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={selectedProduct?.name || ''}
                onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={selectedProduct?.price || ''}
                onChange={(e) => setSelectedProduct({...selectedProduct, price: parseFloat(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={selectedProduct?.category || ''}
                onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={selectedProduct?.stock || ''}
                onChange={(e) => setSelectedProduct({...selectedProduct, stock: parseInt(e.target.value)})}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="font-freize">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
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