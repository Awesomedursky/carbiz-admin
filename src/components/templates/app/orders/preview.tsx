import CustomButton from "@/components/atoms/button/CustomButton";
import OrderProductItemCard from "@/components/molecules/order/OrderProductItemCard";
import OrderTimelineItem from "@/components/molecules/order/OrderTimelineItem";
import AssignAvailaRider from "@/components/organisms/form/assignAvailableRidersForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatAmount } from "@/lib/functions";
import Status from "@/lib/statusClass";
import { useFetchOrder } from "@/queries/orders.query";
import { useDrawerStore } from "@/store/drawer.store";
import { OrderItem, OrderSummaryItem, TimelineStep } from "@/types/order.type";
import RiderEntity from "@/types/rider.type";
import { ArrowLeft } from "@phosphor-icons/react";
import moment from "moment";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import DetailsSection from "@/components/molecules/order/DetailsSection";
import Customer from "@/types/customer.type";
import { BoxIcon } from "lucide-react";
const PreviewOrder = () => {
  const { openModal } = useDrawerStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/")[2];

  const { AdminFetchoneOrder, data, loading } = useFetchOrder();

  // initial fetch
  useEffect(() => {
    if (!path) return;
    AdminFetchoneOrder({
      variables: { orderID: path },
      pollInterval: data?.RidersRide?.picked_up_parcelAT ? 10000 : 0,
    });
  }, [path, data?.RidersRide?.picked_up_parcelAT]);

  // refresh handler
  const refreshOrder = () => {
    AdminFetchoneOrder({
      variables: { orderID: path },
      fetchPolicy: "network-only",
    });
  };

  // products
  const products: OrderItem[] = (data?.items ?? []).map((item, idx) => ({
    id: idx + 1,
    title: item?.product?.productName,
    originalPrice: item?.product?.price || 0,
    color: item?.product?.productColor || "N/A",
    image: item?.product?.productImages?.[0] || "",
    price: item?.product?.discountedPrice || 0,
    isDiscountApplied: item?.product?.isDiscountApplied,
  }));

  // order summary items
  const summaryItems: OrderSummaryItem[] = [
    {
      label: "Products Subtotal:",
      amount: Number(data?.subTotal),
    },
    {
      label: "Delivery Subtotal:",
      amount: Number(data?.deliveryFee),
    },
    {
      label: "Total",
      amount: Number(data?.total),
    },
  ];

  // saved amount
  const saved = data?.pooledSavings || 0;
  if (saved !== 0) {
    summaryItems.push({
      label: "Saved:",
      amount: -saved,
      isSaved: data?.isPooled || false,
    });
  }

  // order timeline steps
  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      title: "Order Received",
      description: "Waiting for merchant to confirm order.",
      time: moment(data?.createdAT).format("DD MMM, YYYY hh:mm A") ?? "-",
      isCompleted: true,
    },
    {
      id: 2,
      title: "Order Processed",
      description: "Order has been paid for by customer. but not yet packaged.",
      time:
        data?.paymentStatus === "paid"
          ? moment(data?.paymentConfirmedAT).format("DD MMM, YYYY hh:mm A")
          : "-",
      isCompleted:
        data?.paymentStatus === "paid"
          ? Boolean(data?.paymentConfirmedAT)
          : false,
    },
    {
      id: 3,
      title: "Order Packaged",
      description: "Order has been packaged and assembled.",
      time:
        data?.orderPackedAT !== null
          ? moment(data?.orderPackedAT).format("DD MMM, YYYY hh:mm A")
          : "-",
      isCompleted:
        Boolean(data?.paymentConfirmedAT) && Boolean(data?.orderPackedAT),
    },
    {
      id: 4,
      title: "Courier Pick-up",
      description: "Courier collected package from Merchant.",
      time: data?.RidersRide?.picked_up_parcelAT
        ? moment(data?.RidersRide?.picked_up_parcelAT).format(
            "DD MMM, YYYY hh:mm A",
          )
        : "-",
      isCompleted: Boolean(data?.RidersRide?.picked_up_parcelAT),
    },
    {
      id: 5,
      title: "In-Transit",
      description: "Package is on the way to you.",
      time: data?.RidersRide?.enroute_to_dropoff_locationAT
        ? moment(data?.RidersRide?.enroute_to_dropoff_locationAT).format(
            "DD MMM, YYYY hh:mm A",
          )
        : "-",
      isCompleted: Boolean(data?.RidersRide?.enroute_to_dropoff_locationAT),
    },
    {
      id: 6,
      title: "Order Arrived",
      description: "Courier arrived at delivery address.",
      time: data?.RidersRide?.at_dropoff_locationAT
        ? moment(data?.RidersRide?.at_dropoff_locationAT).format(
            "DD MMM, YYYY hh:mm A",
          )
        : "-",
      isCompleted: Boolean(data?.RidersRide?.at_dropoff_locationAT),
    },
    {
      id: 7,
      title: "Order Delivered",
      description: "Package handed to customer.",
      time: data?.RidersRide?.dropped_off_parcelAT
        ? moment().format("DD MMM, YYYY hh:mm A")
        : "-",
      isCompleted: Boolean(data?.RidersRide?.dropped_off_parcelAT),
    },
  ];

  const merchants = Array.isArray(data?.merchants)
    ? data.merchants.map(
        ({
          __typename,
          ...rest
        }: {
          __typename?: string;
          [key: string]: any;
        }) => rest,
      )
    : [];

  // shipping address
  const address = Object.fromEntries(
    Object.entries(data ?? {}).filter(
      ([key]) => key.toLowerCase() === "shippingaddress",
    ),
  );

  // merchants details

  const customerDetails: Partial<Customer> | undefined = data?.customer
    ? (Object.fromEntries(
        Object.entries(data.customer ?? {}).filter(
          ([key]) => key !== "__typename",
        ),
      ) as Partial<Customer>)
    : undefined;

  // rider details
  const riderDetails: Partial<RiderEntity> | undefined = data?.RidersRide?.rider
    ? (Object.fromEntries(
        Object.entries(data.RidersRide.rider ?? {}).filter(
          ([key]) => key !== "__typename",
        ),
      ) as Partial<RiderEntity>)
    : undefined;

  // assign rider popup
  const popup = () =>
    openModal({
      type: "dialog",
      title: "Assign Order to Rider",
      description: "Select the Rider you want to deliver this Package",
      content: AssignAvailaRider,
      props: { orderID: path, isPooled: data?.isPooled },
    });

  // order status and payment status
  const orderStatus = data?.orderStatus;
  //assign rider logic
  const isPaid = data?.paymentConfirmedAT !== null;
  const isPackaged = orderStatus === "Packed_And_Ready_For_Pickup";
  const isAwaitingRider = orderStatus === "AWAITING_RIDER_ACCEPTANCE";
  const isRiderAssigned = orderStatus === "Rider_Assigned";
  const isInTransit = orderStatus === "In_Transit";

  const isDelivered =
    orderStatus === "Delivered" || orderStatus === "Cancelled";
  const canAssignRider =
    isPaid &&
    isPackaged &&
    !isAwaitingRider &&
    !isRiderAssigned &&
    !isInTransit &&
    !isDelivered;

  return (
    <div className="space-y-2.5 md:space-y-5 flex flex-col flex-1 h-full relative">
      {/* Headder section, order ID, order status and button to prepare order for pickup */}
      <div className=" flex justify-between gap-y-1.5 items-center flex-wrap ">
        <div className="flex items-center space-x-2 flex-wrap">
          <Button
            onClick={() => navigate(-1)}
            variant={"ghost"}
            className="flex items-center gap-3  flex-wrap p-0"
          >
            <div className="inline-flex space-x-1.5">
              <ArrowLeft className="size-6 font-bold text-gray-800" />
              <h3 className="font-medium text-gray-800 text-base"> Order Id</h3>
            </div>{" "}
            -<h5 className="font-medium text-gray-800 text-base">{path}</h5>
          </Button>

          <p
            className={`inline rounded px-3 py-1 font-medium font-family-satoshi text-sm capitalize ${
              Status[
                (data?.orderStatus?.toLowerCase() ??
                  "default") as keyof typeof Status
              ]
            }`}
          >
            {data?.orderStatus ? data.orderStatus.replaceAll("_", " ") : "-"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CustomButton variant="outline" onClick={refreshOrder}>
            Refresh
          </CustomButton>

          <CustomButton disabled={!canAssignRider} onClick={popup}>
            Assign Order To Rider
          </CustomButton>
        </div>
      </div>

      <div className="flex-1">
        {/* loading section */}
        {loading ? (
          <div className="flex items-center justify-center h-full w-full min-h-60vh">
            {" "}
            <Spinner className="size-8 text-primary" />
          </div>
        ) : (
          // main section
          <div className="flex items-start gap-4  flex-col md:flex-row">
            <div className="w-full max-w-7xl col-span-3 space-y-4">
              <div className="bg-white border border-gray-200 rounded-[0.75rem] space-y-5">
                <div className="p-4 border-b ">
                  <h3 className="text-base font-bold ">Order Items</h3>
                </div>
                {/* product details */}
                <div className="px-6 pb-6 border-b last:border-0 mb-2">
                  {products?.map((product) => (
                    <OrderProductItemCard
                      key={product.id}
                      orderItem={product}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-[0.75rem] space-y-5">
                <div className="p-4 border-b ">
                  <h3 className="text-base font-bold ">Order Summary</h3>
                </div>
                <div className="space-y-3 px-6 pb-6">
                  {summaryItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <h3 className="text-gray-700 text-sm font-semibold">
                        {item.label}
                      </h3>
                      <span
                        className={`text-sm font-semibold ${
                          item.isDiscount
                            ? "text-blue-600"
                            : item.isSaved
                              ? "text-red-600"
                              : "text-gray-900"
                        }`}
                      >
                        {item.isDiscount || item.isSaved ? "-" : ""}
                        {formatAmount(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-[0.75rem] ">
                <div className="p-4 border-b ">
                  <h3 className="text-base font-bold ">Delivery Type</h3>
                </div>
                <div className=" p-4">
                  <div className=" p-4 flex items-center space-x-1.5 bg-primary/10 rounded-sm">
                    <div className=" border border-primary p-0.5 rounded-full">
                      <p className=" size-4 bg-primary rounded-full"></p>
                    </div>
                    <p className=" bg-primary/10 rounded-full p-2 inline-flex">
                      <BoxIcon className="size-5 text-primary" />
                    </p>
                    <p className="flex flex-col">
                      <span className=" text-sm font-medium">
                        {data?.deliveryType} Delivery
                      </span>
                      <span className="text-xs">
                        {data?.deliveryType === "standard" ? "3 - 4" : "1 - 2"}{" "}
                        business day
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white border border-gray-200 rounded-[0.75rem] space-y-5">
                <div className="p-4 border-b ">
                  <h3 className="text-base font-bold ">Order Timeline</h3>
                </div>
                <div className="space-y-3 px-6 pb-6">
                  {timelineSteps.map((step, index) => (
                    <OrderTimelineItem
                      step={step}
                      index={index}
                      total={timelineSteps.length}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full bg-white p-2 border-gray-200 rounded-[0.75rem]">
              {/* Delievery Details */}
              <DetailsSection
                title=" Order Delievery Details"
                details={address ?? {}}
              />
              {/* Merchant Details */}

              {merchants?.map((merchant, idx) => {
                const sectionTitle = `Merchant Details ${idx === 0 ? "" : idx + 1}`;
                return (
                  <DetailsSection
                    key={idx}
                    details={merchant ?? {}}
                    title={sectionTitle}
                  />
                );
              })}

              {/* Customer Details */}
              <DetailsSection
                title="Customer Details"
                details={customerDetails ?? {}}
              />
              {/* Rider Details */}
              <DetailsSection
                title="Riders Details"
                details={riderDetails ?? {}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewOrder;
