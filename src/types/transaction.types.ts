import Customer from "./customer.type";
import Merchant from "./merchants.type";
import RiderEntity from "./rider.type";

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
