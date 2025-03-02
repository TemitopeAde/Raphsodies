import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to format month names
const getMonthName = (date) => 
  new Intl.DateTimeFormat("en-GB", { month: "short" }).format(date);

export async function GET() {
  try {
    // Get monthly orders
    const monthlyOrders = await prisma.payment.groupBy({
      by: ["createdAt"],
      _count: { _all: true },
      orderBy: { createdAt: "asc" },
    });

    // Get monthly products
    const monthlyProducts = await prisma.product.groupBy({
      by: ["createdAt"],
      _count: { _all: true },
      orderBy: { createdAt: "asc" },
    });

    // Get monthly users
    const monthlyUsers = await prisma.user.groupBy({
      by: ["createdAt"],
      _count: { _all: true },
      orderBy: { createdAt: "asc" },
    });

    // Initialize a map for monthly data (group by month and year)
    const monthlyDataMap = new Map();

    // Process monthly orders
    monthlyOrders.forEach((entry) => {
      const date = new Date(entry.createdAt);
      const month = getMonthName(date);
      const year = date.getFullYear().toString();
      const key = `${month}-${year}`;

      if (!monthlyDataMap.has(key)) {
        monthlyDataMap.set(key, { name: month, year, orders: 0, products: 0, users: 0 });
      }
      monthlyDataMap.get(key).orders += entry._count._all;
    });

    // Process monthly products
    monthlyProducts.forEach((entry) => {
      const date = new Date(entry.createdAt);
      const month = getMonthName(date);
      const year = date.getFullYear().toString();
      const key = `${month}-${year}`;

      if (!monthlyDataMap.has(key)) {
        monthlyDataMap.set(key, { name: month, year, orders: 0, products: 0, users: 0 });
      }
      monthlyDataMap.get(key).products += entry._count._all;
    });

    // Process monthly users
    monthlyUsers.forEach((entry) => {
      const date = new Date(entry.createdAt);
      const month = getMonthName(date);
      const year = date.getFullYear().toString();
      const key = `${month}-${year}`;

      if (!monthlyDataMap.has(key)) {
        monthlyDataMap.set(key, { name: month, year, orders: 0, products: 0, users: 0 });
      }
      monthlyDataMap.get(key).users += entry._count._all;
    });

    // Convert map to array
    const monthlyData = Array.from(monthlyDataMap.values());

    // Get yearly data
    const yearlyOrders = await prisma.payment.groupBy({
      by: ["createdAt"],
      _count: { _all: true },
      orderBy: { createdAt: "asc" },
    });

    const yearlyProducts = await prisma.product.groupBy({
      by: ["createdAt"],
      _count: { _all: true },
      orderBy: { createdAt: "asc" },
    });

    const yearlyUsers = await prisma.user.groupBy({
      by: ["createdAt"],
      _count: { _all: true },
      orderBy: { createdAt: "asc" },
    });

    // Initialize a map for yearly data
    const yearlyDataMap = new Map();

    // Process yearly orders
    yearlyOrders.forEach((entry) => {
      const year = new Date(entry.createdAt).getFullYear().toString();

      if (!yearlyDataMap.has(year)) {
        yearlyDataMap.set(year, { name: year, orders: 0, products: 0, users: 0 });
      }
      yearlyDataMap.get(year).orders += entry._count._all;
    });

    // Process yearly products
    yearlyProducts.forEach((entry) => {
      const year = new Date(entry.createdAt).getFullYear().toString();

      if (!yearlyDataMap.has(year)) {
        yearlyDataMap.set(year, { name: year, orders: 0, products: 0, users: 0 });
      }
      yearlyDataMap.get(year).products += entry._count._all;
    });

    // Process yearly users
    yearlyUsers.forEach((entry) => {
      const year = new Date(entry.createdAt).getFullYear().toString();

      if (!yearlyDataMap.has(year)) {
        yearlyDataMap.set(year, { name: year, orders: 0, products: 0, users: 0 });
      }
      yearlyDataMap.get(year).users += entry._count._all;
    });

    // Convert map to array
    const yearlyData = Array.from(yearlyDataMap.values());

    return NextResponse.json({ success: true, monthlyData, yearlyData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching overview data:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
