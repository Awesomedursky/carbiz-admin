import { z } from "zod";

const ForgetPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
});

export default ForgetPasswordSchema;

export type ForgetPasswordSchemaType = z.infer<typeof ForgetPasswordSchema>;
