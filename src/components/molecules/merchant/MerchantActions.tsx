"use client";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDrawerStore } from "@/store/drawer.store";
import MerchantDetails from "./merchantDetails";
import Merchant from "@/types/merchants.type";
import GenericDisable from "../genericDisable";

const MerchantAction = ({ merchant }: { merchant: Merchant }) => {
  const { openModal } = useDrawerStore();

  

  const handleApprove = () => {
    openModal({
      type: "dialog",
      title: "Merchant",
      content: GenericDisable,
      props: {
        type: "approve",
        id: merchant?.merchantID,
        name: merchant?.businessName,
      },
      placement: "center",
    });
  };

  // const handleReject = () => {
  //   openModal({
  //     type: "dialog",
  //     title: "Disable Rider",
  //     content: DisableRider,
  //     props: { merchant },
  //     placement: "center",
  //   });
  // };

  // const handleDelete = () => {
  //   openModal({
  //     type: "dialog",
  //     title: "Disable Rider",
  //     content: DeleteModal,
  //     props: {
  //       itemName: "Rider",
  //       onDelete: () => onDelete(merchant.id),
  //     },
  //     placement: "center",
  //   });
  // };

  // const handleDisable = () => {
  //   openModal({
  //     type: "dialog",
  //     title: "Disable Rider",
  //     content: DisableRider,
  //     props: { merchant },
  //     placement: "center",
  //   });
  // };

  const handleViewDetails = () => {
    openModal({
      type: "drawer",
      title: "Merchant Details",
      content: MerchantDetails,
      props: { merchant: merchant.merchantID },
      placement: "right",
    });
  };

  const handleRejectModal = () => {
    openModal({
      title: "Merchant",
      content: GenericDisable,
      type: "dialog",
      props: {
        type: "reject",
        id: merchant?.merchantID,
        name: merchant?.businessName,
        created: merchant?.createdAt,
        // title: "Reject Rider Request",
        // message: "This action will permanently reject this rider.",
        // confirmLabel: "Reject Rider",
        // onConfirm: handleReject,
      },
      placement: "center",
    });
  };

  // const handleDeleteModal = () => {
  //   openModal({
  //     title: "Delete Request",
  //     type: "dialog",

  //     content: DeleteModal,
  //     props: {
  //       id: merchant.id,
  //       title: "Delete Request",
  //       message: "Are you sure you want to delete this rider request?",
  //       confirmLabel: "Delete Request",
  //       onConfirm: handleDelete,
  //     },
  //     placement: "center",
  //   });
  // };

  const getMenuItems = () => {
    const { status, isVerified } = merchant;

    const displayStatus = isVerified
      ? "APPROVED"
      : status === "disabled"
      ? "DISABLED"
      : "PENDING";

    switch (displayStatus) {
      case "PENDING":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleApprove}>
              Approve Merchant
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={handleRejectModal}
              className="text-red-600"
            >
              Reject Merchant
            </DropdownMenuItem>
          </>
        );

      case "APPROVED":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>

            {/* <DropdownMenuItem onSelect={handleDisable}>
              Disable Merchant
            </DropdownMenuItem> */}
          </>
        );

      case "DISABLED":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem
              // onSelect={handleDeleteModal}
              className="text-red-600"
            >
              Delete Request
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

export default MerchantAction;
