import React from "react";
import pdf from "@/assets/images/icons/pdf.svg";

interface DocumentPreviewProps {
  label: string;
  url: string;
  onView: (url: string) => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  label,
  url,
  onView,
}) => {
  return (
    <div className="space-y-2">
      <h4 className="capitalize text-text-primary text-sm font-medium">
        {label}
      </h4>
      <div className="bg-background-light p-6 py-10 rounded-md flex flex-col items-center justify-center">
        <img src={pdf} alt="PDF Icon" className="w-16 h-16 mb-2" />
        <button
          onClick={() => onView(url)}
          className="cursor-pointer px-1 py-2 rounded-md hover:text-text-primary transition-colors text-sm capitalize text-text-secondary"
        >
          view
        </button>
      </div>
    </div>
  );
};

export default DocumentPreview;
