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
import { PayoutOutput } from "@/types/payouts.types";
import PayoutDetails from "./PayoutDetails";
import CancelPayout from "./CancelPayout";
import ApprovePayout from "./ApprovePayout";

const PayoutActions = ({ payout }: { payout: PayoutOutput }) => {
  const { openModal } = useDrawerStore();

  const handleApprove = () => {
    openModal({
      type: "dialog",
      content: ApprovePayout,
      props: {
        bank:
          payout?.merchant !== null
            ? payout?.merchant?.bank_details?.[0]?.accountNumber
            : payout?.rider?.bank_details?.[0]?.accountNumber,
        title: payout?.merchant !== null ? "Merchant" : "Rider",
        name:
          payout?.merchant !== null
            ? payout.merchant.businessName
            : payout.rider !== null
              ? `${payout.rider.firstName} ${payout.rider.lastName}`
              : "N/A",
        id:
          payout?.merchant !== null
            ? payout.merchant.merchantID
            : payout.rider?.riderID || "",
        requestID: payout.payoutRequetID,
        amount: payout.netPayout,
        payoutId: payout?.payoutID,
      },
    });
  };

  const handleCancelPayout = () => {
    openModal({
      type: "dialog",
      content: CancelPayout,
      props: {
        payoutId: payout?.payoutID,
        title: payout?.merchant !== null ? "Merchant" : "Rider",
        name:
          payout?.merchant !== null
            ? payout.merchant.businessName
            : payout.rider !== null
              ? `${payout.rider.firstName} ${payout.rider.lastName}`
              : "N/A",
        id:
          payout?.merchant !== null
            ? payout.merchant.merchantID
            : payout.rider?.riderID || "",
        requestID: payout.payoutRequetID,
        amount: payout.netPayout,
      },
    });
  };

  const handleViewDetails = () => {
    openModal({
      type: "drawer",
      title: "Payout Details",
      content: PayoutDetails,
      props: { payout },
      placement: "right",
    });
  };

  const getMenuItems = () => {
    const { paymentStatus } = payout;
    const status = paymentStatus.toLowerCase();

    switch (status) {
      case "pending":
      case "processing":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleApprove}>
              Initiate Payout
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={handleCancelPayout}
              className="text-red-600"
            >
              Cancel Payout
            </DropdownMenuItem>
          </>
        );

      case "successful":
      case "cancelled":
      case "approved":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>
          </>
        );

      default:
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>
          </>
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

export default PayoutActions;
