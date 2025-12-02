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

import NotificationDetails from "@/components/molecules/notification/NotificationDetails";
import { NotificationEntity } from "@/columns/notifications.columns";
import { useDrawerStore } from "@/store/drawer.store";
import NotificationForm from "@/components/molecules/notification/NotificationForm";
import GenericDisable from "../genericDisable";

const NotificationActions: React.FC<{ notification: NotificationEntity }> = ({
  notification,
}) => {
  const { openModal } = useDrawerStore();

  /** --- HANDLERS --- **/
  const handleUpdateNotification = (
    updatedNotification: NotificationEntity
  ) => {
    console.log("Updated notification:", updatedNotification);
  };

  function onDelete(id: number) {
    console.log(`Deleting notification with id: ${id}`);
  }

  /** --- RENDER --- **/
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 focus:outline-none"
        >
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-50">
        <DropdownMenuItem
          onSelect={() => {
            openModal({
              title: "Notification Details",
              content: NotificationDetails,
              props: { notification },
              placement: "right",
            });
          }}
        >
          View
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            openModal({
              title: "Edit Notification",
              content: NotificationForm,
              props: {
                initialData: notification,
                onCreate: handleUpdateNotification,
              },
              placement: "right",
            });
          }}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            openModal({
              title: "Delete Notification",
              content: GenericDisable,
              props: {
                itemName: "Notification",
                onDelete: () => onDelete(notification.id),
              },
              placement: "center",
            });
          }}
          className="text-red-600"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationActions;
