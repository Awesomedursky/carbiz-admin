import React from "react";

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

export interface DetailRowProps {
  label: string;
  value: string;
  isMultiline?: boolean;
}

export const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  isMultiline = false,
}) => (
  <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0">
    <span className="text-sm text-gray-600 flex-shrink-0 min-w-0 mr-4">
      {label}
    </span>
    <span
      className={`text-sm text-gray-900 font-medium text-right ${
        isMultiline ? "max-w-xs" : ""
      }`}
    >
      {value}
    </span>
  </div>
);

export interface DetailsSectionProps {
  title: string;
  viewText: string;
  onViewClick: () => void;
  children: React.ReactNode;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({
  title,
  viewText,
  onViewClick,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 p-2.5">
        <h3 className="text-lg font-semibold text-gray-900 font-family-satoshi">{title}</h3>
        <button
          onClick={onViewClick}
          className="text-primary text-sm font-semibild font-family-satoshi"
        >
          {viewText}
        </button>
      </div>
      <div className="space-y-0 px-4">{children}</div>
    </div>
  );
};

export default DetailsSection;
