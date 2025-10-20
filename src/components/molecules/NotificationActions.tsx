"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import NotificationDetails from "@/components/molecules/NotificationDetails";
import { NotificationEntity } from "@/columns/notifications.columns";
import { useDrawerStore } from "@/store/drawer.store";

const NotificationActions: React.FC<{ notification: NotificationEntity }> = ({
  notification,
}) => {
 
  const { openModal } = useDrawerStore();

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
          <DropdownMenuItem
            onSelect={() =>
              openModal({
                title: "Notification Details",
                content: NotificationDetails,
                props: { notification },
                placement: 'right'
              })
            }
          >
            View
          </DropdownMenuItem>
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
    </div>
  );
};

export default NotificationActions;
