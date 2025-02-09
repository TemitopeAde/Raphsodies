'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductForm from '../Dashboard/ProductForm';

const ProductTable = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
  ]);

  const handleAddProduct = (product) => {
    setProducts([...products, { ...product, id: `PRD00${products.length + 1}` }]);
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border-b border-gray-300 px-4 py-3 text-left">Image</th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left">Name</th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left">Price</th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left">Category</th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-800 cursor-pointer">
                    <td className="px-4 py-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="px-4 py-3 text-sm">{product.name}</td>
                    <td className="px-4 py-3 text-sm">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">{product.category}</td>
                    <td className="px-4 py-3 text-sm">{product.stock} units</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ProductForm Modal */}
      <ProductForm 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onAddProduct={handleAddProduct} 
      />
    </>
  );
};

export default ProductTable;
