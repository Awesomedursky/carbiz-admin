import { Icon } from "iconsax-reactjs";
import React from "react";

interface AnalyticsProp {
  icon?: Icon;
  title: string;
  value?: number | string;
  isCurrency?: boolean;
  iconColor?: string;
}

const Analytics: React.FC<AnalyticsProp> = ({
  title,
  icon: Icon,
  value,
  isCurrency = false,
  iconColor,
}) => {
  return (
    <div className="bg-white border border-border-gray px-6 py-6 md:py-10 flex flex-col gap-2 md:gap-4 rounded-lg space-y-5">
      <div className="inline-flex gap-2.5">
        <span
          className="rounded-full p-2"
          style={{
            backgroundColor: iconColor ? `${iconColor}20` : "#f4f4f4", // hex + transparency
          }}
        >
          {Icon && <Icon size={16} color={iconColor} variant="Bold" />}
        </span>
        <h4 className="text-lg font-family-satoshi">{title}</h4>
      </div>
      <h3 className="text-3xl text-text-primary font-medium font-family-satoshi">
        {isCurrency
          ? `N${typeof value === "number" ? value.toLocaleString() : value}`
          : typeof value === "number"
          ? value.toLocaleString("en-US")
          : value || 0}
      </h3>
    </div>
  );
};

export default Analytics;
