import { Skeleton } from "@/components/ui/skeleton";
import DetailsSection from "../order/DetailsSection";
import { useFetchOneComplaint } from "@/queries/complaints.query";
import { ComplaintOutput } from "@/types/complaints.type";
import CustomButton from "@/components/atoms/button/CustomButton";
import { Link } from "react-router";

export const ComplaintsDetail = ({
  complaint,
}: {
  complaint: ComplaintOutput;
}) => {
  const complaintId = complaint?.complaintID ?? "";

  // Avoid crash or unnecessary fetch
  const { data, loading } = useFetchOneComplaint(complaintId);
  const complaintData: ComplaintOutput | undefined = Array.isArray(data)
    ? data?.[0]
    : data;

  const filteredData = Object.fromEntries(
    Object.entries(complaintData ?? {}).filter(
      ([key, value]) =>
        ![
          "customer",
          "deletedat",
          "title",
          "description",
          "complaintid",
          "deletedat",
          "id",
          "updatedat",
          "orderid",
        ].includes(key.toLowerCase()) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  const customerDetails = Object.fromEntries(
    Object.entries(complaintData?.customer ?? {}).filter(
      ([key]) => !["__typename"].includes(key.toLowerCase())
    )
  ) as Record<string, unknown>;

  if (loading) {
    return (
      <div className="grid w-full p-2.5 md:p-3.5 grid-cols-1 space-y-1.5 h-full">
        {Array.from({ length: 2 }).map((_, p) => (
          <Skeleton key={p} className="h-30" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-2.5 md:p-3.5">
      {/* Title Section */}
      <div className="bg-white rounded-lg border border-[#F1ECF9] mb-4 shadow-sm overflow-clip">
        <div className="p-3 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Title</h3>
        </div>
        <div className="p-3 bg-gray-100">
          <p className="capitalize text-sm font-medium">
            {complaintData?.title ?? "-"}
          </p>
        </div>
      </div>
      {/* Description Section */}
      <div className="bg-white rounded-lg border border-[#F1ECF9] mb-4 shadow-sm overflow-clip">
        <div className="p-3 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Description</h3>
        </div>
        <div className="p-3 bg-gray-100">
          <p className="capitalize text-sm font-medium text-justify">
            {complaintData?.description ?? "-"}
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg border border-[#F1ECF9] mb-4 shadow-sm overflow-clip flex justify-between items-center p-3">
        <h3 className="text-lg font-semibold text-gray-900">Order ID</h3>
        <CustomButton>
          <Link to={`/orders/${complaintData?.orderID}`}>
            {complaintData?.orderID ?? "-"}
          </Link>
        </CustomButton>
      </div>

      {/* Detail Sections */}
      <DetailsSection title="Other Details" details={filteredData} />
      <DetailsSection
        title="Customer Details"
        details={customerDetails ?? {}}
      />

      {/* If the second DetailsSection is intentional, rename it */}
      {/* <DetailsSection title="More Information" details={filteredData} /> */}
    </div>
  );
};
