import { adminEntity } from "./admin.type";
import Customer from "./customer.type";
import Merchant, { MerchantEntity } from "./merchants.type";
import OrderEntity from "./order.type";
import RiderEntity from "./rider.type";

export interface PayoutOutput {
  commision: GLfloat;
  completedBy: adminEntity;
  completedOn: Date;
  createdAt: Date;
  deletedAt: Date;
  grossSaleAmount: GLfloat;
  id: Number;
  invoiceStatus: string;
  merchant: MerchantEntity;
  netPayout: GLfloat;
  paymentMethod: string;
  paymentNote: string;
  paymentReceipt: string;
  paymentStatus: string;
  payoutAt: Date;
  payoutID: string;
  payoutRequestAmount: GLfloat;
  payoutRequetID: string;
  payoutStatus: string;
  platformCommisions: GLfloat;
  processingFee: GLfloat;
  relatedOrders: [OrderEntity];
  rider: RiderEntity;
  taxDeduction: GLfloat;
  totalDeductions: GLfloat;
  transactionReference: string;
  updatedAt: Date;
}

type TransactionEntity = {
  amount: number;
  createdAt: Date;
  customer: Customer;
  description: string;
  id: number;
  merchant: Merchant;
  metadata: TransactionMetadata;
  orderID: string;
  reference: string;
  rider: RiderEntity;
  status: string;
  transactionID: string;
  type: string;
};

export default TransactionEntity;

type TransactionMetadata = {
  additionalInfo: string;
  orderReference: string;
  type: string;
};
