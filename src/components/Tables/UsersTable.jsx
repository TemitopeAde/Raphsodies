'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UsersTable = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', joined: '2023-05-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', joined: '2023-06-15' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', joined: '2023-07-20' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'Moderator', joined: '2023-08-05' },
    { id: 5, name: 'Charlie White', email: 'charlie@example.com', role: 'User', joined: '2023-09-30' },
  ];

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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="border-b border-gray-300 px-4 py-3 text-left">ID</th>
                <th className="border-b border-gray-300 px-4 py-3 text-left">Name</th>
                <th className="border-b border-gray-300 px-4 py-3 text-left">Email</th>
                <th className="border-b border-gray-300 px-4 py-3 text-left">Role</th>
                <th className="border-b border-gray-300 px-4 py-3 text-left">Joined</th>
                <th className="border-b border-gray-300 px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-800 cursor-pointer">
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">{user.id}</td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">{user.name}</td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">{user.email}</td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">{user.role}</td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">{user.joined}</td>
                  <td className="border-b border-gray-300 px-4 py-3">
                    <Button size="sm" onClick={() => handleViewUser(user)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-white font-freize font-semibold text-xl mb-2">User Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 text-white font-unbounded">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Joined:</strong> {selectedUser.joined}</p>
            </div>

            <div>
                {/* <Button variant="outline" size="sm" className="text-white font-unbounded text-xl px-4 py-2">Send Message</Button> */}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default UsersTable;
