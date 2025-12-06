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
import { useDrawerStore } from "@/store/drawer.store";
import NotificationForm from "@/components/molecules/notification/NotificationForm";
import GenericDisable from "../genericDisable";
import { NotificationCenterOutput } from "@/types/notification-center.type";

const NotificationActions: React.FC<{
  notification: NotificationCenterOutput;
}> = ({ notification }) => {
  const { openModal } = useDrawerStore();

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
              type: "drawer",
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
              type: "dialog",
              title: "Edit Notifications",
              content: NotificationForm,
              props: {
                notification,
              },
            });
          }}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            openModal({
              type: "dialog",
              title: "Notification",
              content: GenericDisable,
              props: {
                type: "delete",
                itemName: "Notification",
                id: notification?.notificationID,
                name: notification?.notificationTitle,
                state: "notification",
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
