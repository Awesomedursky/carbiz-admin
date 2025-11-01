import React, { useState, ReactNode } from "react";

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

/** --- Detail Row --- **/
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
    <span className="text-sm text-gray-600 flex-shrink-0 mr-4 min-w-[100px] capitalize">
      {label}
    </span>
    <span
      className={`capitalize text-sm font-semibold text-right ${
        isMultiline ? "max-w-xs" : ""
      }`}
    >
      {value}
    </span>
  </div>
);

/** --- Helper: Render Status Badge --- **/
const renderStatusBadge = (status: string | undefined) => {
  if (!status) return "-";

  const normalized = status.toUpperCase();

  const statusColors: Record<string, string> = {
    APPROVED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    DISABLED: "bg-red-100 text-red-700",
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-100 text-gray-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  const colorClass =
    statusColors[normalized] || "bg-gray-100 text-gray-700 capitalize";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold tracking-wide ${colorClass}`}
    >
      {status}
    </span>
  );
};

/** --- Generic Details Section --- **/
interface DetailsSectionProps {
  title?: string;
  details: Record<string, any>; // flexible
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

      {/* Animated body */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showContent ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        } px-4`}
      >
        <div className="space-y-0">
          {Object.entries(details)?.map(([key, value]) => {
            const isStatus =
              key.toLowerCase() === "status" ||
              String(value).toLowerCase() === "status";

            const displayValue = isStatus
              ? renderStatusBadge(String(value))
              : value ?? "-";

            return (
              <DetailRow
                key={key}
                label={key}
                value={displayValue}
                isMultiline={typeof value === "string" && value.length > 50}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
