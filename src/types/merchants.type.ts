import BankEntity from "./bank.type";
import OrderEntity from "./order.type";
import ProductEntity from "./product.type";
import TransactionEntity from "./transaction.types";

type LocationType = {};

interface Merchant {
  CAC: string;
  address: string;
  bank_details: BankEntity[];
  businessLicense: string;
  businessName: string;
  businessPics: string;
  city: string;
  country: string;
  createdAt: Date;
  deletedAt: Date;
  email: string;
  id: number;
  isVerified: boolean;
  location: LocationType;
  merchantID: string;
  my_transaction: TransactionEntity[];
  onboardingActions: string;
  onboardingPercentage: number;
  //   onboardingStatus: MerchantOnboardingStatusType;
  //   orderStatuses: [MerchantOrderStatusEntity];
  my_products: ProductEntity;
  phoneNumber: string;
  postalCode: string;
  resetPasswordOtp: string;
  resetPasswordOtpExpiration: Date;
  role: string;
  status: string;
  taxID: string;
  updatedAt: Date;
  validIDcard: string;
}

export default Merchant;
