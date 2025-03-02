"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useOrders from "@/hooks/payment/useOrder";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Debounce search input (delay API calls)
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useOrders({ page, limit: 50, search: debouncedSearch });

  const orders = data?.data || [];
  const pagination = data?.pagination || { totalPages: 1, page };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search order by reference"
          className="w-full mb-4 p-2 border rounded text-primary font-unbounded"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border-b border-gray-300 px-4 py-3 text-left">Date</th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left">Customer</th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left">Amount</th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-900 cursor-pointer">
                    <td className="border-b border-gray-300 px-4 py-3 text-sm">
                      {new Date(order.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-sm">{order.user?.name || "N/A"}</td>
                    <td className="border-b border-gray-300 px-4 py-3 text-sm">{order.amount}</td>
                    <td className="border-b border-gray-300 px-4 py-3">
                      <Button size="sm" onClick={() => handleViewOrder(order)}>
                        View Items
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </CardContent>

      {/* Order Items Dialog */}
      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto py-10 px-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-white font-unbounded">Order Items (Order #{selectedOrder.id})</DialogTitle>
            </DialogHeader>
            <div>
            <ul className="list-disc pl-5 space-y-2">
              {selectedOrder.products.map((product, index) => (
                <li className="text-white font-freize" key={index}>
                  <div className="flex flex-row justify-start gap-4">
                    <span className="font-semibold text-lg">{product.name}</span>
              
                    <img className="w-32 h-24 object-contain" src={product?.imageUrl} alt={product?.name} />
                  </div>
                </li>
              ))}
            </ul>

            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default Orders;
