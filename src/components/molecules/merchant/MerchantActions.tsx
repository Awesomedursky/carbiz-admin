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

export const newHandleApprove = (
  openModal: ({}: any) => void,
  merchant: Merchant
) => {
  openModal({
    type: "dialog",
    title: "Merchant",
    content: GenericDisable,
    props: {
      type: "approve",
      id: merchant?.merchantID,
      name: merchant?.businessName,
      state: "merchant",
    },
    placement: "center",
  });
};

export const newHandleRejectModal = (
  openModal: ({}: any) => void,
  merchant: Merchant
) => {
  openModal({
    title: "Merchant",
    content: GenericDisable,
    type: "dialog",
    props: {
      type: "reject",
      id: merchant?.merchantID,
      name: merchant?.businessName,
      created: merchant?.createdAt,
      state: "merchant",
    },
    placement: "center",
  });
};

const MerchantAction = ({ merchant }: { merchant: Merchant }) => {
  const { openModal } = useDrawerStore();

  const handleApprove = () => {
    newHandleApprove(openModal, merchant);
  };

  const handleRejectModal = () => {
    newHandleRejectModal(openModal, merchant);
  };

  const handleViewDetails = () => {
    openModal({
      type: "drawer",
      title: "Merchant Details",
      content: MerchantDetails,
      props: { merchant },
      placement: "right",
    });
  };

  const getMenuItems = () => {
    const { status, isApproved } = merchant;

    const displayStatus = isApproved
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
