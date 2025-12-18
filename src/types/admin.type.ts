import Merchant from "./merchants.type";
import OrderEntity from "./order.type";
import RiderEntity from "./rider.type";

export type PaginationQuery = {
  limit: number;
  page: number;
  sortBy: string;
  sortOrder: string;
  searchTerm?: string;
  endDate?: Date | string | undefined;
  startDate?: Date | string | undefined;
};

export interface adminEntity {
  adminAccess: string;
  adminID: string;
  createdAt: Date;
  deletedAt: Date;
  email: string;
  id: Number;
  isVerified: Boolean;
  my_completed_payouts: [PayoutOutput];
  name: string;
  password: string;
  phoneNumber: string;
  profilePics: string;
  resetPasswordOtp: string;
  resetPasswordOtpExpirationTime: Date;
  role: string;
  status: string;
  updatedAt: Date;
}

export interface PayoutOutput {
  completedBy: adminEntity;
  completedOn: Date;
  createdAt: Date;
  deletedAt: Date;
  grossSaleAmount: GLfloat;
  id: Number;
  invoiceStatus: string;
  merchant: Merchant;
  netPayout: GLfloat;
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
