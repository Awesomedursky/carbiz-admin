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
import RiderDetails from "@/components/molecules/riders/RiderDetails";
import RiderEntity from "@/types/rider.type";
import GenericDisable from "../genericDisable";

interface RiderActionsProps {
  rider: RiderEntity;
}

export const newHandleRiderApprove = (
  openModal: ({}: any) => void,
  rider: RiderEntity
) => {
  openModal({
    type: "dialog",
    title: "Rider",
    content: GenericDisable,
    props: {
      type: "approve",
      id: rider?.riderID,
      name: `${rider?.firstName} -  ${rider?.lastName}`,
      state: "rider",
    },
    placement: "center",
  });
};

export const newHandleRiderReject = (
  openModal: ({}: any) => void,
  rider: RiderEntity
) => {
  openModal({
    type: "dialog",
    title: "Rider",
    content: GenericDisable,
    props: {
      type: "reject",
      id: rider?.riderID,
      name: `${rider?.firstName} -  ${rider?.lastName}`,
      state: "rider",
    },
    placement: "center",
  });
};

const RiderActions: React.FC<RiderActionsProps> = ({ rider }) => {
  const { openModal } = useDrawerStore();

  const handleApprove = () => {
    newHandleRiderApprove(openModal, rider);
  };

  const handleReject = () => {
    newHandleRiderReject(openModal, rider);
  };

  const actualStatus = () => {
    const { isApproved, status } = rider;
    const displayStatus = isApproved
      ? "APPROVED"
      : status === "disabled"
      ? "DISABLED"
      : "PENDING";

    return displayStatus;
  };

  // const handleDelete = () => {
  //   openModal({
  //     type: "dialog",
  //     title: "Disable Rider",
  //     content: GenericDisable,
  //     props: {
  //       itemName: "Rider",
  //       onDelete: () => onDelete(rider.id),
  //     },
  //     placement: "center",
  //   });
  // };

  const handleDisable = () => {
    openModal({
      type: "dialog",
      title: "Rider",
      content: GenericDisable,
      props: { rider, id: rider.riderID },
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

  // const handleRejectModal = () => {
  //   openModal({
  //     title: "Reject Rider Request",
  //     content: DeleteModal,
  //     type: "dialog",
  //     props: {
  //       id: rider.id,
  //       title: "Reject Rider Request",
  //       message: "This action will permanently reject this rider.",
  //       confirmLabel: "Reject Rider",
  //       onConfirm: handleReject,
  //     },
  //     placement: "center",
  //   });
  // };

  const getMenuItems = () => {
    switch (actualStatus()) {
      case "PENDING":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              {/* <DrawerTrigger> */}
              View Details
              {/* </DrawerTrigger> */}
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleApprove}>
              Approve Rider
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleReject} className="text-red-600">
              Reject Rider
            </DropdownMenuItem>
          </>
        );

      case "APPROVED":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleDisable}>
              Disable Rider
            </DropdownMenuItem>
          </>
        );

      case "DISABLED":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleApprove}>
              Re-Approve Rider
            </DropdownMenuItem>
          </>
        );

      default:
        return (
          <DropdownMenuItem onSelect={handleViewDetails}>
            View Details
          </DropdownMenuItem>
        );
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">{getMenuItems()}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RiderActions;
