type CardDetailProps = {
  title: string;
  value: string | boolean;
  isLast?: boolean;
};

export const CardDetail = ({ title, value, isLast }: CardDetailProps) => {
  const isStatus = title.toLowerCase() === "status";
  const isApproved = value === true;
  const isRejected = value === false;

  const displayValue =
    isStatus && typeof value === "boolean"
      ? isApproved
        ? "Approved"
        : "Pending Approval"
      : value?.toString();

  const valueClass = isStatus
    ? isApproved
      ? "text-primary"
      : isRejected
      ? "text-red-500"
      : "text-black/70"
    : "text-black/70";

  return (
    <div
      className={`w-max md:min-w-42 flex flex-col gap-1 pr-14 ${
        isLast ? "" : "border-r"
      } border-[#E6E5E8]`}
    >
      <p className="text-[#837E8E] text-sm capitalize">{title}</p>
      <p className={`text-base font-bold ${valueClass}`}>
        {displayValue}
      </p>
    </div>
  );
};
