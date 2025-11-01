import { TimelineStep } from "@/types/order.type";
import React from "react";

const OrderTimelineItem: React.FC<{
  step: TimelineStep;
  index: number;
  total: number;
}> = ({ step, index, total }) => {
  return (
    <div className="relative flex items-start pb-2.5 last:pb-0">
      {/* Timeline Line */}
      {index < total - 1 && (
        <div
          className={`absolute left-2.5 top-6 w-0.5 h-10  border-1 border-dashed  ${
            step.isCompleted
              ? "border-primary bg-primary"
              : "border-gray-200 bg-gray-200"
          }}`}
        ></div>
      )}

      {/* Timeline Dot */}
      <div
        className={`relative flex-shrink-0 border-2 ${
          step.isCompleted
            ? "border-primary bg-primary"
            : "border-gray-200 bg-gray-200"
        }} rounded-full p-[2px] items-center`}
      >
        <div
          className={`w-3 h-3 rounded-full flex items-center justify-center ${
            step.isCompleted ? "bg-primary" : "bg-gray-200"
          }`}
        ></div>
      </div>

      {/* Timeline Content */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
          <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
            {step.time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderTimelineItem;
