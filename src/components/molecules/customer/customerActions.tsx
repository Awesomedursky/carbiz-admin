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
import { useDrawerStore } from "@/store/drawer.store";
import Customer from "@/types/customer.type";
import CustomerDetails from "./customerDetails";
import GenericDisable from "../genericDisable";

const CustomerActions: React.FC<{ customer: Customer }> = ({ customer }) => {
  const { openModal } = useDrawerStore();

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
              title: "Customer Details",
              content: CustomerDetails,
              props: { customer },
              placement: "right",
            });
          }}
        >
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            openModal({
              type: "dialog",
              title: "Customer",
              content: GenericDisable,
              props: {
                itemName: "Customer",
                // onDelete: () => onDelete(customer.id),
              },
              placement: "center",
            });
          }}
          className="text-red-600"
        >
          Disable User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomerActions;
