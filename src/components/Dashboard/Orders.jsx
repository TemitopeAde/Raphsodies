'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const orders = [
    { id: 1, date: '2025-02-09', customer: 'John Doe', amount: 50, items: ['Item A', 'Item B'] },
    { id: 2, date: '2025-02-08', customer: 'Jane Smith', amount: 75, items: ['Item C', 'Item D', 'Item E'] },
    { id: 3, date: '2025-01-20', customer: 'Alice Johnson', amount: 200, items: ['Item F'] },
    { id: 4, date: '2024-12-15', customer: 'Bob Brown', amount: 300, items: ['Item G', 'Item H'] },
    { id: 5, date: '2024-06-10', customer: 'Charlie White', amount: 5000, items: ['Item I', 'Item J', 'Item K'] },
    { id: 6, date: '2024-03-25', customer: 'Diana Green', amount: 6000, items: ['Item L', 'Item M', 'Item N', 'Item O'] },
  ];

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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="border-b border-gray-300 px-4 py-3 text-left">ID</th>
                <th className="border-b border-gray-300 px-4 py-3 text-left">Date</th>
                <th className="border-b border-gray-300 px-4 py-3 text-left">Customer</th>
                <th className="border-b border-gray-300 px-4 py-3 text-left">Amount</th>
                <th className="border-b border-gray-300 px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-900 cursor-pointer">
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">{order.id}</td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">{order.date}</td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">{order.customer}</td>
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
      </CardContent>

      {/* Order Items Dialog */}
      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-white">Order Items (Order #{selectedOrder.id})</DialogTitle>
            </DialogHeader>
            <div>
              <ul className="list-disc pl-5">
                {selectedOrder.items.map((item, index) => (
                  <li className="text-white" key={index}>{item}</li>
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
