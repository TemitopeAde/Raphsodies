'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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

const fetchSummary = async () => {
  const res = await fetch('/api/summary');
  if (!res.ok) throw new Error('Failed to fetch summary data');
  return res.json();
};

const fetchChartData = async () => {
  const res = await fetch('/api/chart-data');
  if (!res.ok) throw new Error('Failed to fetch chart data');
  return res.json();
};

const Overview = () => {
  const [chartType, setChartType] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Fetch summary data
  const { data: summaryData, isLoading: summaryLoading, error: summaryError } = useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
  });

  // Fetch chart data
  const { data: chartData, isLoading: chartLoading, error: chartError } = useQuery({
    queryKey: ['chartData'],
    queryFn: fetchChartData,
  });

  if (summaryLoading || chartLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (summaryError || chartError) {
    return <p className="text-red-500 text-center">Error loading data.</p>;
  }

  const { totalProducts, totalOrders, totalUsers } = summaryData;
  const { monthlyData, yearlyData } = chartData;

  // Extract unique years from the monthlyData
  const uniqueYears = [...new Set(monthlyData.map((entry) => entry.year))].sort((a, b) => b - a);

  // Extract unique months
  const uniqueMonths = [...new Set(monthlyData.map((entry) => entry.name))];

  // Filter monthly data based on selected year and month
  const filteredMonthlyData = monthlyData.filter((entry) =>
    (selectedYear ? entry.year === selectedYear : true) &&
    (selectedMonth ? entry.name === selectedMonth : true)
  );

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex gap-4">
            <Select onValueChange={setChartType} defaultValue={chartType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="font-freize">
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>

            {chartType === 'monthly' && (
              <>
                {/* Year Selection */}
                <Select onValueChange={setSelectedYear} value={selectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="font-freize">
                    {uniqueYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Month Selection */}
                <Select onValueChange={setSelectedMonth} value={selectedMonth}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent className="font-freize">
                    {uniqueMonths.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartType === 'monthly' ? filteredMonthlyData : yearlyData}>
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
