import { Skeleton } from "@/components/ui/skeleton";
import { fetchOnePayout } from "@/queries/payouts.query";
import { PayoutOutput } from "@/types/payouts.types";
import DetailsSection from "../order/DetailsSection";
import { BoxIcon } from "lucide-react";
import { useNavigate } from "react-router";

const PayoutDetails = ({ payout }: { payout: PayoutOutput }) => {
  const { singlePayoutDetails, singlePayoutLoading } = fetchOnePayout(
    payout.payoutID
  );
  const navigate = useNavigate();

  const filteredData = Object.fromEntries(
    Object.entries(singlePayoutDetails ?? {}).filter(
      ([key, value]) =>
        ["payoutid", "payoutat", "paymentmethod", "invoicestatus"].includes(
          key.toLowerCase()
        ) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  const merchant = Object.fromEntries(
    Object.entries(singlePayoutDetails ?? {}).filter(
      ([key, value]) =>
        ["merchant"].includes(key.toLowerCase()) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  const rider = Object.fromEntries(
    Object.entries(singlePayoutDetails ?? {}).filter(
      ([key, value]) =>
        ["rider"].includes(key.toLowerCase()) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  const finances = Object.fromEntries(
    Object.entries(singlePayoutDetails ?? {}).filter(
      ([key, value]) =>
        [
          "grosssaleamount",
          "commision",
          "taxdeduction",
          "processingfee",
          "totaldeductions",
          "netpayout",
        ].includes(key.toLowerCase()) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  const my_orders = singlePayoutDetails?.relatedOrders;

  if (singlePayoutLoading) {
    return (
      <div className="grid w-full p-2.5 md:p-3.5 grid-cols-1 space-y-1.5 h-full">
        {Array.from({ length: 2 }).map((_, p) => (
          <Skeleton key={p} className=" h-30" />
        ))}
      </div>
    );
  }

  const manualPaymentCompleted = Object.fromEntries(
    Object.entries(singlePayoutDetails ?? {}).filter(
      ([key, value]) =>
        [
          "completedon",
          "transactionreference",
          "paymentnote",
          "paymentreceipt",
        ].includes(key.toLowerCase()) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  const flattenedManualPayment = () => {
    const completedBy = singlePayoutDetails?.completedBy;
    return {
      completedBy: completedBy?.name,
      ...manualPaymentCompleted,
    };
  };

  return (
    <div className=" p-2.5 md:p-3.5">
      <DetailsSection
        title="Payment Information"
        details={filteredData ?? {}}
      />
      <DetailsSection
        title={
          merchant?.merchant === null ? "Rider Details" : "Merchant Details"
        }
        details={
          merchant?.merchant === null
            ? flattenEntity(rider?.rider)
            : flattenEntity(merchant?.merchant)
        }
      />
      {/* financial breakdown */}
      <div className="bg-white rounded-lg border border-[#F1ECF9] mb-4 shadow-sm space-y-2.5">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-[#F1ECF9] last:border-b-0 p-2.5">
          Financial Breakdown
        </h3>

        <div className=" p-2.5 flex flex-col space-y-1.5">
          <h3 className=" text-xs text-[#68655F] font-bold flex justify-between px-2.5">
            Gross Sales Amount:{" "}
            <span className=" text-black font-bold">
              ₦{Number(finances?.grossSaleAmount ?? "0")}
            </span>
          </h3>
          <div className=" flex flex-col  bg-[#FCFAFF] border-[#F1ECF9] border p-2.5 rounded-lg">
            {Object.entries(finances).map(([key, value]) => {
              if (
                key.toLowerCase() === "grosssaleamount" ||
                key.toLowerCase() === "totaldeductions" ||
                key.toLowerCase() === "netpayout"
              )
                return null;
              const label =
                key === "commision"
                  ? "Platform Commission (10%)"
                  : key === "taxDeduction"
                  ? "Tax Deduction (5%)"
                  : "Processing Fee";
              return (
                <div className="flex justify-between py-2 border-b border-[#F1ECF9] last:border-b-0">
                  <span className="text-xs text-[#061812]">{label}</span>
                  <span className="text-xs text-black font-bold">
                    ₦{String(value ?? "0")}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end flex-col items-end">
            <h3 className=" text-xs text-[#68655F] font-bold px-2.5">
              Total Deductions:{" "}
              <span className=" text-red-500 font-normal">
                - ₦{Number(finances?.totalDeductions ?? "0").toPrecision(5)}
              </span>
            </h3>
            <h3 className=" text-xs text-[#68655F] font-bold px-2.5">
              Net Payout:{" "}
              <span className=" text-[#3E8152] font-bold">
                ₦{Number(finances?.netPayout ?? "0").toPrecision(5)}
              </span>
            </h3>
          </div>
        </div>
      </div>

      {my_orders && my_orders.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200  shadow-sm mb-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 p-2.5">
            Related Orders
          </h3>
          <div className="p-3">
            <span className=" text-[#5B0E8B] italic font-bold leading-tight text-xs">
              This payout covers 4 completed orders: All orders were completed
              and eligible after the 3-day buffer period.
            </span>
            <div className="grid grid-cols-1 space-y-1.5 p-3">
              {my_orders?.map((order: any, idx: number) => (
                <div className="p-2 rounded-lg justify-between flex items-center bg-[#F9F8FD] border border-[#ECE6F8]">
                  <div className="flex items-center space-x-1.5">
                    <span className=" p-2 rounded-lg border size-10 flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="font-bold text-sm flex items-center space-x-1.5">
                      <BoxIcon className="p-2 border rounded-lg size-10" />
                      <span className="font-bold text-sm uppercase">
                        {order?.orderID}
                      </span>
                    </p>
                  </div>
                  <button
                    //   to={"/customers"}
                    onClick={() => navigate(`${order?.orderID}`)}
                    className=" font-semibold text-primary cursor-pointer"
                  >
                    See Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <DetailsSection
        title="Manual Payment Completed"
        details={flattenedManualPayment ?? {}}
      />
    </div>
  );
};

export default PayoutDetails;

const flattenEntity = (entity: any): Record<string, unknown> => {
  if (!entity || typeof entity !== "object") return {};
  let name = "";

  if (entity.firstName || entity.lastName) {
    name = [entity.firstName, entity.lastName].filter(Boolean).join(" ");
  } else if (entity.businessName) {
    name = entity.businessName;
  }
  const idEntry = Object.entries(entity).find(([key]) =>
    key.toLowerCase().endsWith("id")
  );
  const bankDetails = entity.bank_details ?? {};

  return {
    ...(name && { name }),
    ...(idEntry ? { [idEntry[0]]: idEntry[1] } : {}),
    ...bankDetails,
  };
};
