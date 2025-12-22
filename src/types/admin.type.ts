import { PayoutOutput } from "./payouts.types";

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
