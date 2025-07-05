'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUsers } from '@/hooks/admin/useUsers';
import { Input } from '../ui/input';
import { isPending } from '@reduxjs/toolkit';
import { LoadingSpinner } from './Products';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';

const UsersTable = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  const { data, isLoading, isError } = useUsers({ page, limit: 10, name });

  const users = data?.users || [];

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div className="overflow-x-auto">

          {
            isLoading ? (
              <LoadingSpinner />
            ): (
              <>
              <table className="w-full">
                <thead>
                  <tr className="">
                    <th className="border-b border-gray-300 px-4 py-3 text-left">ID</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Name</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Email</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Role</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Joined</th>
                    <th className="border-b border-gray-300 px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className=" cursor-pointer">
                      <td className="border-b border-gray-300 px-4 py-3 text-sm">{parseInt(index) + 1}</td>
                      <td className="border-b border-gray-300 px-4 py-3 text-sm">{user.name}</td>
                      <td className="border-b border-gray-300 px-4 py-3 text-sm">{user.email}</td>
                      <td className="border-b border-gray-300 px-4 py-3 text-sm">{user.role}</td>
                      <td className="border-b border-gray-300 px-4 py-3 text-sm">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB") : "N/A"}
                      </td>

                      <td className="border-b border-gray-300 px-4 py-3">
                        <Button size="sm" onClick={() => handleViewUser(user)}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex items-center justify-center gap-6">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  <ChevronDoubleLeftIcon />
                </button>
                <span>Page {data?.currentPage} of {data?.totalPages}</span>
                <button disabled={page === data?.totalPages} onClick={() => setPage(page + 1)}>
                  <ChevronDoubleRightIcon  />
                </button>
              </div>
              </>
            )
          }

          
        </div>
      </CardContent>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[#475467] font-freize font-semibold text-xl mb-2">User Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 text-[#475467] font-unbounded">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser?.role}</p>
              <p><strong>Joined:</strong> {selectedUser?.createdAt}</p>
            </div>

            
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default UsersTable;
