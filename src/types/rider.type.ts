import BankEntity from "./bank.type";
import TransactionEntity from "./transaction.types";
import WalletEntity from "./wallet";

interface RiderEntity {
  firstName: string;
  lastName: string;
  availabilityStatus: string;
  bank_details: BankEntity[];
  createdAt: Date;
  deletedAt: Date;
  deviceToken: string;
  email: string;
  id: number;
  isApproved: boolean;
  isVerified: boolean;
  // my_rides: [RiderRidesEntity]
  my_transaction: TransactionEntity[];
  my_wallet: WalletEntity;
  name: string;
  password: string;
  phoneNumber: string;
  profilePics: string;
  resetPasswordOtp: string;
  resetPasswordOtpExpiration: Date;
  riderID: string;
  role: string;
  status: string;
  updatedAt: Date;
}

export default RiderEntity;
