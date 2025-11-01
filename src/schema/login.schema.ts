import { z } from "zod";

const LoginSchema = z.object({
  email: z.string({message: "Email is required"}).email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" })
    .max(16, { message: "Must be 16 characters long" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character. e.g. example2@2",
    }),
  
});

export default LoginSchema;

export type LoginSchemaType = z.infer<typeof LoginSchema>;
