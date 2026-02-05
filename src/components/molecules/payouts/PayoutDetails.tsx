import { Skeleton } from "@/components/ui/skeleton";
import { fetchOnePayout } from "@/queries/payouts.query";
import { PayoutOutput } from "@/types/payouts.types";
import DetailsSection from "../order/DetailsSection";
import { BoxIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useDrawerStore } from "@/store/drawer.store";

const PayoutDetails = ({ payout }: { payout: PayoutOutput }) => {
  const { singlePayoutDetails, singlePayoutLoading } = fetchOnePayout(
    payout.payoutID,
  );
  const navigate = useNavigate();
  const { closeModal } = useDrawerStore();

  const handleNavigate = (id: string) => {
    navigate(`orders/${id}`);
    closeModal();
  };

  if (singlePayoutLoading) {
    return (
      <div className="grid w-full p-2.5 md:p-3.5 grid-cols-1 space-y-1.5 h-full">
        {Array.from({ length: 2 }).map((_, p) => (
          <Skeleton key={p} className="h-30" />
        ))}
      </div>
    );
  }

  const rawRider = singlePayoutDetails?.rider;
  const rawMerchant = singlePayoutDetails?.merchant;
  const rawCustomer = singlePayoutDetails?.customer;

  // Bank Details
  const activeEntity = rawMerchant || rawRider || rawCustomer;
  const bankDetailsRaw = activeEntity?.bank_details;
  const bankDetails = Array.isArray(bankDetailsRaw)
    ? bankDetailsRaw
    : bankDetailsRaw
      ? [bankDetailsRaw]
      : [];

  // 3. PREPARE DISPLAY DATA
  const paymentInfo = {
    payoutID: singlePayoutDetails?.payoutID,
    payoutAt: singlePayoutDetails?.payoutAt,
    paymentMethod: singlePayoutDetails?.paymentMethod,
    invoiceStatus: singlePayoutDetails?.invoiceStatus,
    paymentStatus: singlePayoutDetails?.paymentStatus,
  };

  const financialBreakdown = {
    grossSaleAmount: singlePayoutDetails?.grossSaleAmount,
    commission: singlePayoutDetails?.commision,
    taxDeduction: singlePayoutDetails?.taxDeduction,
    processingFee: singlePayoutDetails?.processingFee,
    totalDeductions: singlePayoutDetails?.totalDeductions,
    netPayout: singlePayoutDetails?.netPayout,
  };

  return (
    <div className="p-2.5 md:p-3.5">
      {/* Payment Info */}
      <DetailsSection title="Payment Information" details={paymentInfo} />

      {/* Entity Details (Merchant, Customer, or Rider) */}
      <DetailsSection
        title={
          rawMerchant
            ? "Merchant Details"
            : rawCustomer
              ? "Customer Details"
              : "Rider Details"
        }
        details={flattenEntity(activeEntity)}
      />

      {/* Bank Details Section */}
      <div className="bg-white rounded-lg border border-[#F1ECF9] mb-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-[#F1ECF9] last:border-b-0 p-2.5">
          Bank Details
        </h3>
        <div>
          {bankDetails.length > 0 && (
            <div className="p-2.5 flex flex-col space-y-1.5">
              {bankDetails.map((detail, idx) => (
                <div key={idx} className="text-xs text-gray-700">
                  {Object.entries(detail).map(([key, value]) => {
                    if (key === "__typename") {
                      return;
                    }
                    return (
                      <div key={key} className="flex justify-between py-1">
                        <span className="capitalize">{key}:</span>
                        <span>{value}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="bg-white rounded-lg border border-[#F1ECF9] mb-4 shadow-sm space-y-2.5">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-[#F1ECF9] last:border-b-0 p-2.5">
          Financial Breakdown
        </h3>

        <div className=" p-2.5 flex flex-col space-y-1.5">
          <h3 className=" text-xs text-[#68655F] font-bold flex justify-between px-2.5">
            Gross Sales Amount:{" "}
            <span className=" text-black font-bold">
              ₦{Number(financialBreakdown?.grossSaleAmount ?? "0")}
            </span>
          </h3>
          <div className=" flex flex-col  bg-[#FCFAFF] border-[#F1ECF9] border p-2.5 rounded-lg">
            {Object.entries(financialBreakdown).map(([key, value]) => {
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
                - ₦
                {Number(financialBreakdown?.totalDeductions ?? "0").toPrecision(
                  5,
                )}
              </span>
            </h3>
            <h3 className=" text-xs text-[#68655F] font-bold px-2.5">
              Net Payout:{" "}
              <span className=" text-[#3E8152] font-bold">
                ₦{Number(financialBreakdown?.netPayout ?? "0").toPrecision(5)}
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* Related Orders */}
      {(singlePayoutDetails?.relatedOrders?.length ?? 0) > 0 && (
        /* ... your existing orders mapping ... */
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
              {singlePayoutDetails?.relatedOrders?.map(
                (order: any, idx: number) => (
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
                      onClick={() => handleNavigate(order?.orderID)}
                      className=" font-semibold text-primary cursor-pointer"
                    >
                      See Details
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manual Payment */}
      <DetailsSection
        title="Manual Payment Completed"
        details={{
          completedBy: singlePayoutDetails?.completedBy?.name,
          completedOn: singlePayoutDetails?.completedOn,
          reference: singlePayoutDetails?.transactionReference,
        }}
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
    key.toLowerCase().endsWith("id"),
  );
  // const bankDetails = entity.bank_details ?? {};

  return {
    ...(name && { name }),
    ...(idEntry ? { [idEntry[0]]: idEntry[1] } : {}),
  };
};
