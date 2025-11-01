import { z } from "zod";

const VerifyOtpSchema = z.object({
  // email: z.string().email(),
  otp: z.string().min(6, "OTP code must be 6 digits"),
});

export default VerifyOtpSchema;
export type VerifyOtpSchemaType = z.infer<typeof VerifyOtpSchema>;
