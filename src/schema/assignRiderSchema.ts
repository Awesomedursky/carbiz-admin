import { z } from "zod";

const AssignRiderSchema = z.object({
  riderID: z.string({ required_error: "Rider is required" }),
});

export default AssignRiderSchema;

export type AssignRiderSchemaType = z.infer<typeof AssignRiderSchema>;
