import Customer from "./customer.type";
import { MerchantEntity } from "./merchants.type";
import ProductEntity from "./product.type";
import RiderEntity from "./rider.type";

interface OrderEntity {
  RidersRide: RiderRidesEntity;
  createdAT: Date;
  customer: Customer;
  deliveryFee: number;
  deliveryType: string;
  distance_ms: number;
  dropOffCode: string;
  estimatedTimeOfTravel: number;
  id: number;
  isPooled: boolean;
  items: OrderItemsEntity[];
  // merchantStatuses: [MerchantOrderStatusEntity!]!
  merchants: MerchantEntity;
  orderID: string;
  orderStatus: string;
  paymentStatus: string;
  pickUpCode: string;
  subTotal: number;
  total: number;
  trackingID: string;
  updatedAT: Date;
  vehicleType: string;
  pooledSavings: number;
  shippingAddress: string;
}
export default OrderEntity;

export type OrderItemsEntity = {
  id: number;
  order: OrderEntity;
  orderItemID: string;
  price: string;
  product: ProductEntity;
  quantity: number;
};

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  color: string;
  image: string;
  isDiscountApplied: boolean;
}

export interface OrderSummaryItem {
  label: string;
  amount: number;
  isDiscount?: boolean;
  isSaved?: boolean;
}

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
  time: string;
  isCompleted: boolean;
  isActive?: boolean;
}

export type RiderRidesEntity = {
  at_dropoff_locationAT: Date;
  // checkpointStatus: checkpointStatusType
  createdAt: Date;
  deletedAt: Date;
  dropped_off_parcelAT: Date;
  enroute_to_dropoff_locationAT: Date;
  enroute_to_pickup_locationAT: Date;
  id: number;
  // merchantCheckpoints: [MerchantCheckpointStatus!]!
  milestone: String;
  order: OrderEntity;
  picked_up_parcelAT: Date;
  rider: RiderEntity;
  ridersRideID: String;
  updatedAt: Date;
};
