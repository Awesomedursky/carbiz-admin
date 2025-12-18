import { Skeleton } from "@/components/ui/skeleton";
import { fetchCustomerPreviewQuery } from "@/queries/customers.query";
import Customer from "@/types/customer.type";
import DetailsSection from "../order/DetailsSection";
import { BoxIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useDrawerStore } from "@/store/drawer.store";

interface CustomerType {
  customer: Customer;
}

const CustomerDetails = ({ customer }: CustomerType) => {
  const { data, loading } = fetchCustomerPreviewQuery(
    customer?.customerID || ""
  );
  const nav = useNavigate();
  const { closeModal } = useDrawerStore();

  const filteredData = Object.fromEntries(
    Object.entries(data ?? {}).filter(
      ([key, value]) => !Array.isArray(value) && key !== "__typename"
    )
  ) as Record<string, unknown>;

  const my_orders = (data as any)?.my_orders;

  const navigate = (e: string) => {
    closeModal();
    nav(`orders/${e}`);
  };

  if (loading) {
    return (
      <div className="grid w-full p-2.5 md:p-3.5 grid-cols-1 space-y-1.5">
        {Array.from({ length: 2 }).map((_, p) => (
          <Skeleton key={p} className=" h-30" />
        ))}
      </div>
    );
  }

  return (
    <div className=" p-2.5 md:p-3.5">
      <DetailsSection title="Personal Details" details={filteredData} />

      <div className="bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 p-2.5">
          Customer's Orders
        </h3>

        {my_orders && my_orders.length !== 0 && (
          <div className="grid grid-cols-1 space-y-1.5 p-3">
            {my_orders?.map((order: any, idx: number) => (
              <div className="p-2 border rounded-lg justify-between flex items-center">
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
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
