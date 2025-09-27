import { gql } from "@apollo/client";

export const GET_MERCHANTS = gql`
  query AdminFetchAllMerchants($params: PaginationDto!) {
    AdminFetchAllMerchants(paginationQuery: $params) {
      success
      message
      payload {
        currentPage
        pageSize
        total
        data {
          email
          businessName
          phoneNumber
          createdAt
          merchantID
        }
      }
    }
  }
`;

export const GET_ONE_MERCHANT = gql`
  query AdminFetchOneMerchant($merchantID: String!) {
    AdminFetchOneMerchant(merchantID: $merchantID) {
      success
      message
      payload {
        email
        businessName
        phoneNumber
        createdAt
        merchantID
        businessPics
        isVerified
        status
        taxID
        businessLicense
        validIDcard
        CAC
      }
    }
  }
`;

export const VERIFY_MERCHANT = gql`
  mutation approveOrDisApprove(
    $approve: ApproveUserDto!
    $merchantID: String!
  ) {
    AdminApproveOrDisApproveMerchant(
      approve: $approve
      merchantID: $merchantID
    ) {
      success
      message
      payload {
        isVerified
        status
      }
    }
  }
`;

export const GET_ONE_MERCHANT_PRODUCTS = gql`
  query AdminFetchOneMerchant($merchantID: String!) {
    AdminFetchOneMerchant(merchantID: $merchantID) {
      success
      message
      payload {
        my_products {
          discountPercentage
          discountedPrice
          id
          isDiscountApplied
          price
          priceCurrencyType
          productBreadth_cm
          productColor
          productDescription
          productID
          productImages
          productLength_cm
          productName
          productStatus
          productStock
          productType
          productWeight
          productWeightType
          productWidth_cm
        }
      }
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query fetchOneProduct($productID: String!) {
    fetchOneProduct(productID: $productID) {
      success
      message
      status
      errors
      payload {
        productImages
        productName
        productDescription
        productCategory {
          productCategoryName
        }
        productType
        priceCurrencyType
        productWeightType
        productStock
        productColor
        price
        discountPercentage
        productWeight
        productLength_cm
        productBreadth_cm
        productWidth_cm
      }
    }
  }
`;
