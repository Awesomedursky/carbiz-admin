import { z } from "zod";

const AddAdminSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  adminAccess: z.string().optional(),
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .regex(
      /^(0\d{10}|(\+234|234)\d{10})$/,
      "Invalid phone number. Use 07012345678, +2347012345678, or 2347012345678"
    ),
  password: z.string().optional(),
});

export default AddAdminSchema;

export type AddAdminSchemaType = z.infer<typeof AddAdminSchema>;
