import RiderEntity from "./rider.type";

type TransactionEntity = {
  amount: number;
  createdAT: Date;
  // customer: CustomerEntity
  description: String;
  id: number;
  // merchant: MerchantEntity
  // metadata: TransactionMetadata
  orderID: string;
  reference: string;
  rider: RiderEntity;
  status: String;
  transactionID: String;
  type: String;
};

export default TransactionEntity;
