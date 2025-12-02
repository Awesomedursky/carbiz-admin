import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" })
    .max(16, { message: "Must be 16 characters long" })
    .regex(/^.{8,}$/, {
      message: "Password must be at least 8 characters long.",
    }),
});

export default LoginSchema;

export type LoginSchemaType = z.infer<typeof LoginSchema>;
