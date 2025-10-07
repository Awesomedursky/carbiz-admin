interface ProductEntity {
  createdAt: Date;
  deletedAt: Date;
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  isDiscountApplied: boolean;
  price: number;
  priceCurrencyType: string;
  productBreadth_cm: number;
  productCategory: ProductCategory;
  productColor: string;
  productDescription: string;
  productID: string;
  productImages: string[];
  productLength_cm: number;
  productName: string;
  productStatus: string;
  productStock: number;
  productType: string;
  productWeight: number;
  productWeightType: string;
  productWidth_cm: number;
  restockedAt: Date;
  updatedAt: Date;
}

export default ProductEntity;

export type ProductCategory = {
  createdAt: Date;
  deletedAt: Date;
  id: number;
  productCategoryID: string;
  productCategoryName: string;
  updatedAt: Date;
};
