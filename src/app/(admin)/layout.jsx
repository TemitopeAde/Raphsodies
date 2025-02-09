'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart, 
  FileText, 
  Settings, 
  Menu, 
  X
} from 'lucide-react';

const layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { title: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, href: '/admin/overview' },
    { title: 'Products', icon: <Package className="w-5 h-5" />, href: '/admin/products' },
    { title: 'Orders', icon: <ShoppingCart className="w-5 h-5" />, href: '/admin/orders' },
    { title: 'Users', icon: <Users className="w-5 h-5" />, href: '/admin/users' },
   
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-unbounded text-primary">
      {/* Mobile menu button */}
      <button
        className="fixed p-2 bg-white rounded-lg shadow-lg top-4 left-4 lg:hidden z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center px-2 py-3 text-gray-600 rounded-lg hover:bg-gray-100 group"
              >
                <span className="text-gray-500 group-hover:text-gray-900">
                  {item.icon}
                </span>
                <span className="ml-3 text-sm font-medium group-hover:text-gray-900">
                  {item.title}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className={`lg:ml-64 min-h-screen transition-all duration-200`}>
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default layout;