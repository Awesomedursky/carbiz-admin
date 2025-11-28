export interface AdminOutput {
  adminID: string;
  createdAt: Date;
  deletedAt: Date;
  email: string;
  id: Number;
  isVerified: boolean;
  name: string;
  phoneNumber: string;
  profilePics: string;
  resetPasswordOtp: string;
  resetPasswordOtpExpirationTime: Date;
  role: string;
  status: string;
  upDatedAt: Date;
}
