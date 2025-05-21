import { z } from "zod";

const RegistrationSchema = z.object({
  name: z.string({ message: "Business name is required" }),
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .regex(
      /^(0\d{10}|(\+234|234)\d{10})$/,
      "Invalid phone number. Use 07012345678, +2347012345678, or 2347012345678"
    ),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" })
    .max(16, { message: "Must be 16 characters long" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character. e.g. example2@2",
    }),
  //profileImage: z.string({ message: "kindly upload a profile image" }),
  // agreement: z.boolean().refine((val) => val === true, {
  //   message: "You must accept the terms and conditions",
  //   path: ["agreement"],
  // }),
});

export default RegistrationSchema;

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
