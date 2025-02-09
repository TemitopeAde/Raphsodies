'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Overview = () => {
  const [chartType, setChartType] = useState('monthly');

  // Mock data for summary cards
  const summaryData = {
    totalProducts: 120,
    totalOrders: 56,
    totalUsers: 89,
  };

  // Monthly data
  const monthlyData = [
    { name: 'Jan', products: 40, orders: 24, users: 30 },
    { name: 'Feb', products: 30, orders: 13, users: 20 },
    { name: 'Mar', products: 20, orders: 8, users: 15 },
    { name: 'Apr', products: 27, orders: 19, users: 25 },
    { name: 'May', products: 18, orders: 10, users: 18 },
    { name: 'Jun', products: 23, orders: 15, users: 22 },
  ];

  // Yearly data
  const yearlyData = [
    { name: '2020', products: 200, orders: 150, users: 180 },
    { name: '2021', products: 250, orders: 180, users: 200 },
    { name: '2022', products: 300, orders: 210, users: 250 },
    { name: '2023', products: 350, orders: 260, users: 300 },
  ];

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summaryData.totalProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summaryData.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summaryData.totalUsers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">Overview</CardTitle>
          <Select onValueChange={setChartType} defaultValue={chartType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartType === 'monthly' ? monthlyData : yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="products" fill="#8884d8" />
                <Bar dataKey="orders" fill="#82ca9d" />
                <Bar dataKey="users" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
