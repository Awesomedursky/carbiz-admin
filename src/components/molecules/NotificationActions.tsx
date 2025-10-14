"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import NotificationDetails from "@/components/molecules/NotificationDetails";
import { NotificationEntity } from "@/columns/notifications.columns";

const NotificationActions: React.FC<{ notification: NotificationEntity }> = ({
  notification,
}) => {
  const [open, setOpen] = useState(false);

  const handleView = (e: Event) => {
    e.preventDefault();
    // Let dropdown close before opening dialog
    setTimeout(() => setOpen(true), 100);
  };

  return (
    <div>
      {/* --- Dropdown Menu --- */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 focus:outline-none"
          >
            <MoreVertical className="h-4 w-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={handleView}>View</DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              alert(`Editing: ${notification.title}`);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              alert(`Deleting: ${notification.title}`);
            }}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* --- Dialog rendered outside dropdown --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle>{notification.title}</DialogTitle>
            <DialogDescription>
              View complete information about this notification.
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-4" />

          <NotificationDetails notification={notification} />

          <div className="flex justify-end pt-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationActions;
