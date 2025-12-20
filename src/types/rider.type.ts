import BankEntity from "./bank.type";
import { RiderRidesEntity } from "./order.type";
import TransactionEntity from "./payouts.types";
import WalletEntity from "./wallet";

interface RiderEntity {
  availabilityStatus: string;
  bank_details: [BankEntity];
  createdAt: Date;
  deletedAt: Date;
  deviceToken: string;
  email: string;
  firstName: string;
  governmentVerificationNumber: string;
  governmentVerificationType: string;
  id: number;
  isApproved: boolean;
  isGovernmentIDverified: boolean;
  isVerified: boolean;
  lastName: string;
  my_rides: [RiderRidesEntity];
  my_transaction: [TransactionEntity];
  my_wallet: WalletEntity;
  onboardingActions: string;
  onboardingPercentage: GLfloat;
  // onboardingStatus: RiderOnboardingStatusType;
  password: string;
  phoneNumber: string;
  profilePics: string;
  resetPasswordOtp: string;
  resetPasswordOtpExpirationTime: Date;
  riderID: string;
  role: string;
  status: string;
  updatedAt: Date;
  vehicle: [VehicleEntity];
}

export default RiderEntity;

export interface VehicleEntity {
  createdAT: Date;
  driversLicense: string;
  id: GLfloat;
  plateNumber: string;
  rider: RiderEntity;
  updatedAT: Date;
  vehicleDocuments: string;
  vehicleID: string;
  vehicleType: string;
}
