import { z } from "zod";

const DocumentSchema = z.object({
  businessLicense: z.string().optional(),
  vin: z.string().optional(),
  cac: z.string().optional(),
  tin: z.string().optional(),
});

export default DocumentSchema;

export type DocumentSchemaType = z.infer<typeof DocumentSchema>;
