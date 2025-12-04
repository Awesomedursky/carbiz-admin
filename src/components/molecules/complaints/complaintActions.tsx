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
import { ComplaintOutput } from "@/types/complaints.type";
import { ComplaintsDetail } from "./complaintDetails";
import ComplaintResolve from "./ComplaintResolve";
import { useUpdateComplaint } from "@/queries/complaints.query";
import { useToast } from "@/hooks/Toast";

interface ComplaintProps {
  complaint: ComplaintOutput;
}

const CompliaintActions: React.FC<ComplaintProps> = ({ complaint }) => {
  const { openModal } = useDrawerStore();
  const { adminUpdateComplaint, updateComplaintLoading } = useUpdateComplaint();
  const { handleInfo } = useToast();

  React.useEffect(() => {
    if (updateComplaintLoading) {
      handleInfo("Updating complaint...");
    }
  }, [updateComplaintLoading]);

  const onMarkComplaintAsInProgress = () => {
    adminUpdateComplaint({
      variables: {
        complaintID: complaint?.complaintID ?? "",
        input: { status: "InProgress" },
      },
    });
  };

  const handleReplyViaEmail = () => {
    const email = complaint?.customer?.email ?? "";

    if (!email) return;

    const subject = encodeURIComponent("Product Complaint");
    const body = encodeURIComponent(
      `Hello,\n\nRegarding your complaint titled "${complaint?.title}".\n\n`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const actualStatus = () => {
    const raw = complaint.status?.toString().toUpperCase();
    switch (raw) {
      case "CLOSED":
        return "CLOSED";
      case "INPROGRESS":
        return "INPROGRESS";
      case "RESOLVED":
        return "RESOLVED";
      default:
        return "PENDING";
    }
  };

  const handleViewDetails = () => {
    openModal({
      type: "drawer",
      title: "Complaints Details",
      content: ComplaintsDetail,
      props: { complaint },
      placement: "right",
    });
  };

  const handleResolve = () => {
    openModal({
      width: 650,
      type: "dialog",
      title: "Resolve Complaint",
      content: ComplaintResolve,
      props: { complaint, T: "resolve" },
    });
  };

  const handleCLose = () => {
    openModal({
      width: 650,
      type: "dialog",
      title: "Close Complaint",
      content: ComplaintResolve,
      props: { complaint, T: "close" },
    });
  };

  const getMenuItems = () => {
    switch (actualStatus()) {
      case "PENDING":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={onMarkComplaintAsInProgress}>
              Mark As In Progress
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleResolve}>
              Mark As Resolvedm
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleReplyViaEmail}>
              Reply Via Mail
            </DropdownMenuItem>
          </>
        );

      case "INPROGRESS":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleResolve}>
              Mark As Resolved
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleCLose}>
              Mark As Closed
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleReplyViaEmail}>
              Reply Via Mail
            </DropdownMenuItem>
          </>
        );

      case "CLOSED":
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleReplyViaEmail}>
              Reply Via Email
            </DropdownMenuItem>
          </>
        );

      default:
        return (
          <>
            <DropdownMenuItem onSelect={handleViewDetails}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleReplyViaEmail}>
              Reply Via Email
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

export default CompliaintActions;
