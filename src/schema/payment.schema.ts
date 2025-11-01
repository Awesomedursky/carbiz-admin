import { z } from "zod";

const PaymentSchema = z.object({
  accountName: z.string({ message: "Account name is required" }),
  accountNumber: z
    .string({ message: "Account number is required" })
    .regex(/^(0\d{10}|\d{10})$/, "Invalid account number. Use 07012345678"),
  bankName: z.string({ message: "Bank name is required" }),
});


export default PaymentSchema;

export type PaymentSchemaType = z.infer<typeof PaymentSchema>;
