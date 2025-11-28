import OrderEntity from "./order.type";
import TransactionEntity from "./transaction.types";

interface Customer {
  addresses: Address[];
  createdAt: Date;
  customerID: string;
  deletedAt: Date;
  deviceToken: String;
  email: string;
  id: number;
  isVerified: boolean;
  //   my_cart: OrderCartEntity!;
  my_orders: OrderEntity[];
  my_transaction: TransactionEntity[];
  //   my_wallet: WalletEntity!;
  name: string;
  phoneNumber: string;
  profilePics: String;
  resetPasswordOtp: String;
  resetPasswordOtpExpiration: Date;
  role: string;
  status: string;
  updatedAt: Date;
}

export default Customer;

export type Address = {};
