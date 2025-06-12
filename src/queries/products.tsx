import { useQuery } from "@apollo/client";

import ProductEntity from "@/types/product.type";
import { GET_ONE_MERCHANT_PRODUCTS } from "@/api/merchants";

interface MerchantProductResponseType {
  AdminFetchOneMerchant: {
    success: boolean;
    message: string;
    payload: {
      my_products: ProductEntity[];
    };
  };
}

export const useFetchMerchantProducts = (merchantID: string) => {
  const { data, loading, error } = useQuery<MerchantProductResponseType>(
    GET_ONE_MERCHANT_PRODUCTS,
    {
      variables: { merchantID: merchantID },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      onCompleted(data) {
        console.log(data.AdminFetchOneMerchant.payload.my_products);
      },
    }
  );

  return {
    data: data?.AdminFetchOneMerchant.payload.my_products || [],
    loading,
    error,
  };
};
