import { z } from "zod";

const ProductSchema = z.object({
  productImages: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(5),
  productName: z.string({ message: "Product name is required" }),
  productDescription: z.string({ message: "Product description is required" }),
  productCategory: z.string({ message: "Product category is required" }),
  productType: z.string({ message: "Product status is required" }),
  priceCurrencyType: z.string({ message: "currency type is required" }),
  priceWeightType: z.string({ message: "weight type is required" }),
  productStock: z.coerce.number({ message: "Provide available stock" }),
  productColor: z.string({ message: "Product color is required" }),
  price: z.coerce.number({ message: "Product price is required" }),
  discountPercentage: z.coerce.number({ message: "Discount is required" }),
  productWeight: z.coerce.number({ message: "Product weight is required" }),
  productLength_cm: z.coerce.number({ message: "Product Length is required" }),
  productBreadth_cm: z.coerce.number({
    message: "Product Breadth is required",
  }),
  productWidth_cm: z.coerce.number({ message: "Product Width is required" }),
});

export default ProductSchema;

export type ProductSchemaType = z.infer<typeof ProductSchema>;
