import { Skeleton } from "@/components/ui/skeleton";
import DetailsSection from "../order/DetailsSection";
import { Button } from "@/components/ui/button";
import { useDrawerStore } from "@/store/drawer.store";
import RiderEntity from "@/types/rider.type";
import { useFetchRider } from "@/queries/riders.query";
import { newHandleRiderApprove, newHandleRiderReject } from "./RiderActions";

const RidersDetails = ({ rider }: { rider: RiderEntity }) => {
  const { data, loading } = useFetchRider(rider?.riderID || "");

  console.log(data);
  const { openModal } = useDrawerStore();

  const handleApprove = () => {
    newHandleRiderApprove(openModal, rider);
  };

  const handleRejectModal = () => {
    newHandleRiderReject(openModal, rider);
  };

  const status = data?.isApproved;

  const filteredData = Object.fromEntries(
    Object.entries(data ?? {}).filter(
      ([key, value]) =>
        !["vehicles", "my_payouts"].includes(key.toLowerCase()) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  // const my_rides = data?.my_rides
  // const vehicles = data?.vehicle

  const document = Object.fromEntries(
    Object.entries(data?.vehicle[0] || {}).filter(
      ([key]) => key !== "__typename"
    )
  );

  if (loading) {
    return (
      <div className="grid w-full p-2.5 md:p-3.5 grid-cols-1 space-y-1.5 h-full">
        {Array.from({ length: 2 }).map((_, p) => (
          <Skeleton key={p} className=" h-30" />
        ))}
      </div>
    );
  }

  const buttonRender = () => {
    if (status == false) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <Button variant={"outline"} onClick={handleRejectModal}>
            Reject Rider
          </Button>
          <Button className="" onClick={handleApprove}>
            Approve Rider
          </Button>
        </div>
      );
    }

    return (
      <div className="flex place-self-end">
        <Button variant={"destructive"}>Disable Rider</Button>
      </div>
    );
  };

  return (
    <div className=" p-2.5 md:p-3.5">
      <DetailsSection title="Personal Details" details={filteredData} />
      <DetailsSection title="Vehicle Details" details={document} />

      <div className="bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
        {/* <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 p-2.5">
          My Products
        </h3> */}

        {/* {my_products?.map((i: ProductEntity, idx: number) => (
          <div key={idx} className="grid grid-cols-1 space-y-1.5 p-3">
            <div className="p-2 border rounded-lg justify-between flex items-center">
              <p className="font-bold text-sm flex items-center space-x-1.5">
                <BoxIcon className="p-2 border rounded-lg size-10" />
                <span className="font-bold text-sm uppercase">
                  {i?.productID} -{" "}
                  <span className=" text-primary">{i?.productName}</span>
                </span>
              </p>
            </div>
          </div>
        ))} */}
      </div>
      <div className="mt-2">{buttonRender()}</div>
    </div>
  );
};

export default RidersDetails;
