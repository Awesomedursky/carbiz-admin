import ProductEntity from "./product.type";

interface OrderEntity {
  // RidersRide: RiderRidesEntity!
  createdAT: Date;
  customer: {
    name: string;
    email: string;
    phoneNumber: string;
    customerID: string;
  };
  deliveryFee: number;
  deliveryType: string;
  distance_ms: number;
  dropOffCode: string;
  estimatedTimeOfTravel: number;
  id: number;
  isPooled: boolean;
  items: OrderItemsEntity[];
  // merchantStatuses: [MerchantOrderStatusEntity!]!
  // merchants: [MerchantEntity!]!
  orderID: string;
  orderStatus: string;
  paymentStatus: string;
  pickUpCode: string;
  subTotal: number;
  total: number;
  trackingID: string;
  updatedAT: Date;
  vehicleType: string;
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
