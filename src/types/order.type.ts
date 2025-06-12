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
