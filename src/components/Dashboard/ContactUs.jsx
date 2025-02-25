"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
    fetchContacts();
  }, []);

  const openEmailDialog = (contact) => {
    setSelectedContact(contact);
    setReplyMessage("");
    setDialogOpen(true);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;
    setIsSending(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: selectedContact.email,
          name: selectedContact.name,
          message: replyMessage,
        }),
      });

      const result = await response.json();
      alert(result.message || "Reply sent successfully!");
    } catch (error) {
      alert("Failed to send reply.");
    }

    setIsSending(false);
    setDialogOpen(false);
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="p-4 shadow-md border border-gray-300 rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{contact.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white"><strong>Email:</strong> {contact.email}</p>
              <p className="text-white"><strong>Phone:</strong> {contact.phone}</p>
              <p className="mt-4 text-white whitespace-pre-line"><strong>Message:</strong> {contact.message}</p>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => openEmailDialog(contact)}>Send Email</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog to send reply */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-white">Send Reply</DialogTitle>
          </DialogHeader>
          <p className="text-white">Replying to: {selectedContact?.email}</p>
          <Textarea
            placeholder="Type your reply here..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="mt-2 h-32 text-white"
          />
          <DialogFooter>
            <Button onClick={handleSendReply} disabled={isSending}>
              {isSending ? <Loader2 className="animate-spin mr-2" /> : "Send Reply"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
