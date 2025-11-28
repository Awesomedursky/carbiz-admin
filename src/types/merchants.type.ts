import BankEntity from "./bank.type";
import OrderEntity from "./order.type";
import ProductEntity from "./product.type";
import TransactionEntity from "./transaction.types";

type LocationType = {
  latitude: GLfloat;
  longitude: GLfloat;
};

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
  isApproved: boolean;
  location: LocationType;
  merchantID: string;
  my_transaction: TransactionEntity[];
  onboardingActions: string;
  onboardingPercentage: number;
  //   onboardingStatus: MerchantOnboardingStatusType;
  //   orderStatuses: [MerchantOrderStatusEntity];
  //   orders: [OrderEntity];
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

export interface MerchantEntity {
  CAC: String;
  address: String;
  // bank_details: [BankEntity!]!;
  businessLicense: String;
  businessName: String;
  businessPics: String;
  city: String;
  country: String;
  createdAt: Date;
  deletedAt: Date;
  email: String;
  id: Number;
  isApproved: Boolean;
  isVerified: Boolean;
  location: LocationType;
  merchantID: string;
  my_products: ProductEntity;
  my_transaction: TransactionEntity;
  onboardingActions: string;
  onboardingPercentage: number;
  // onboardingStatus: MerchantOnboardingStatusType;
  // orderStatuses: MerchantOrderStatusEntity;
  orders: OrderEntity;
  password: string;
  phoneNumber: String;
  postalCode: String;
  resetPasswordOtp: String;
  resetPasswordOtpExpirationTime: Date;
  role: String;
  status: String;
  taxID: String;
  updatedAt: Date;
  validIDcard: String;
}
