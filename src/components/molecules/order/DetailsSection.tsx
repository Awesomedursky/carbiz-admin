import React, { useState, ReactNode } from "react";
import moment from "moment";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

export interface MerchantDetails {
  name: string;
  phoneNumber: string;
}
export interface CustomerDetails {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
}
export interface RiderDetails {
  name: string;
  phoneNumber: string;
}

// detail row
interface DetailRowProps {
  label: string;
  value: ReactNode;
  isMultiline?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  isMultiline = false,
}) => (
  <div className="flex justify-between items-start py-3 border-b border-[#F1ECF9] last:border-b-0">
    <span className="text-sm text-gray-600 flex-shrink-0 mr-4 sm:min-w-[100px] capitalize">
      {label}
    </span>
    <span
      className={`capitalize text-sm font-semibold text-right text-wrap ${
        isMultiline ? "max-w-xs" : ""
      }`}
    >
      {value}
    </span>
  </div>
);

// render status badge
const renderStatusBadge = (status: string | boolean | undefined) => {
  if (status === null || status === undefined || status === "") return "-";
  const normalized = String(status).toUpperCase();

  const statusColors: Record<string, string> = {
    APPROVED: "bg-green-100 text-green-700",
    TRUE: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    DISABLED: "bg-red-100 text-red-700",
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-100 text-gray-700",
    REJECTED: "bg-red-100 text-red-700",
    FALSE: "bg-red-100 text-red-700",
    PROCESSING: "bg-[#E2DAF4] text-[#7046C6]",
    SHIPPED: "bg-[#FFF7E1] text-[#DC6803]",
    CLOSED: "bg-[#FEE4E2] text-[#B42318]",
    PAID: "bg-[#D1FADF] text-[#027A48]",
    DELIVERD: "text-[#027A48] bg-[#D1FADF]",
    CANCELLED: "bg-[#FEE4E2] text-[#B42318]",
    AWAITING: "text-[#343239] bg-[#E6E5E8]",
    PACKED_AND_READY_FOR_PICKUP: "text-[#343239] bg-[#E6E5E8]",
    REFUNDED: "text-[#DC6803] bg-[#FFF7E1]",
    INPROGRESS: "bg-[#E2DAF4] text-[#7046C6]",
    RESOLVED: "text-[#027A48] bg-[#D1FADF]",
  };

  const colorClass =
    statusColors[normalized] || "bg-gray-100 text-gray-700 capitalize";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold tracking-wide ${colorClass}`}
    >
      {String(status)}
    </span>
  );
};

// convert camel case to regex
const formatLabel = (label: string): string => {
  return label
    .replace(/([a-z])([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z])([A-Z]{2,})/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

// detetct if value is date
const isDateValue = (value: any): boolean => {
  const date = moment(value, moment.ISO_8601, true);
  return date.isValid();
};

// detect if value is a link
const isLinkValue = (value: any): boolean => {
  if (typeof value !== "string") return false;
  return /^https?:\/\/[^\s]+$/.test(value);
};

// detail section
interface DetailsSectionProps {
  title?: string;
  details: Record<string, any>;
  viewText?: string;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({
  title = "",
  details,
  viewText = "View",
}) => {
  const [showContent, setShowContent] = useState(true);

  return (
    <div className="bg-white rounded-lg border border-[#F1ECF9] mb-4 shadow-sm">
      {/* Header */}
      {title && (
        <div className="flex justify-between items-center  p-2.5">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={() => setShowContent((prev) => !prev)}
            className="text-primary text-sm font-semibold hover:underline cursor-pointer"
          >
            {showContent ? "Hide" : viewText}
          </button>
        </div>
      )}

      {/* Body */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showContent ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        } px-4`}
      >
        <div className="space-y-0">
          {Object.entries(details)?.map(([key, value]) => {
            const label = formatLabel(key);

            let displayValue: ReactNode = "-";

            if (
              typeof value === "boolean" ||
              key.toLowerCase() === "status" ||
              key.toLowerCase() === "isverified"
            ) {
              displayValue = renderStatusBadge(value);
            } else if (isDateValue(value)) {
              displayValue = moment(value).format("YYYY-MM-DD HH:mm");
            } else if (isLinkValue(value)) {
              displayValue = (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className=" border-primary text-primary"
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px] h-[400px] flex items-center justify-center">
                    <img
                      src={value}
                      alt={label}
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              );
            } else if (displayValue === "") {
              value = "-";
            } else {
              displayValue = value ?? "-";
            }

            return (
              <DetailRow
                key={key}
                label={label}
                value={
                  typeof displayValue === "string"
                    ? displayValue.replaceAll("_", " ")
                    : displayValue
                }
                isMultiline={typeof value === "string" && value.length > 5}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
