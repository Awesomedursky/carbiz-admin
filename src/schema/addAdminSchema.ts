import { z } from "zod";

const AddAdminSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  role: z.string({ message: "Role is required" }),
});

export default AddAdminSchema;

export type AddAdminSchemaType = z.infer<typeof AddAdminSchema>;
