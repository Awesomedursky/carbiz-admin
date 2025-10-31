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
import { useDrawerStore } from "@/store/drawer.store";
import DeleteModal from "@/components/molecules/DeleteModal";
import RiderDetails from "@/components/molecules/RiderDetails";
import DisableRider from "./DisableRider";
import RiderEntity from "@/types/rider.type";

interface RiderActionsProps {
  rider: RiderEntity;
}

const RiderActions: React.FC<RiderActionsProps> = ({ rider }) => {
  const { openModal } = useDrawerStore();
  const [open, setOpen] = useState<boolean>(false);

   function onDelete(id: number) {
  
        console.log(`Deleting rider with id: ${id}`);
    }

  const handleApprove = () => {
   openModal({
      title: "Disable Rider",
      content: DisableRider,
      props: { rider },
      placement: "center",
    });
  };

  const handleReject = () => {
    openModal({
      type: "dialog",
      title: "Disable Rider",
      content: DisableRider,
      props: { rider },
      placement: "center",
    });
  };

  const handleDelete = () => {
    openModal({
      type: "dialog",
      title: "Disable Rider",
      content: DeleteModal,
      props: {
        itemName: "Rider",
        onDelete: () => onDelete(rider.id),
      },
      placement: "center",
    });
  };

  const handleDisable = () => {
    openModal({
      type: "dialog",
      title: "Disable Rider",
      content: DisableRider,
      props: { rider },
      placement: "center",
    });
  };

  const handleViewDetails = () => {
    openModal({
      type: "drawer",
      title: "Rider Details",
      content: RiderDetails,
      props: { rider },
      placement: "right",
    });
  };

  const handleRejectModal = () => {
    openModal({
      title: "Reject Rider Request",
      content: DeleteModal,
      type: "dialog",
      props: {
        id: rider.id,
        title: "Reject Rider Request",
        message: "This action will permanently reject this rider.",
        confirmLabel: "Reject Rider",
        onConfirm: handleReject,
      },
      placement: "center",
    });
  };

  const handleDeleteModal = () => {
    openModal({
      title: "Delete Request",
      type: "dialog",

      content: DeleteModal,
      props: {
        id: rider.id,
        title: "Delete Request",
        message: "Are you sure you want to delete this rider request?",
        confirmLabel: "Delete Request",
        onConfirm: handleDelete,
      },
      placement: "center",
    });
  };

  // ---- Menu Items ---- //
  const getMenuItems = () => {
    switch (rider.status) {
      case "PENDING":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
              {/* </DrawerTrigger> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleApprove(); }}>
              Approve Rider
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => { e.stopPropagation(); handleRejectModal(); }}
              className="text-red-600"
            >
              Reject Rider
            </DropdownMenuItem>
          </>
        );

      case "APPROVED":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}
            >
              
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDisable(); }}>
              Disable Rider
            </DropdownMenuItem>
          </>
        );

      case "DISABLED":
        return (
          <>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => { e.stopPropagation(); handleDeleteModal(); }}
              className="text-red-600"
            >
              Delete Request
            </DropdownMenuItem>
          </>
        );

      default:
        return (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}>
            View Details
          </DropdownMenuItem>
        );
    }
  };

  // ---- Dropdown (hover trigger) ---- //
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => e.stopPropagation()}
          className="hover:bg-gray-100 focus:outline-none"
        >
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-50"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {getMenuItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RiderActions;
