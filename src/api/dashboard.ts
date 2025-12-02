import { gql } from "@apollo/client";

export const MERCHNAT_COUNT = gql`
  query {
    AdminFetchMerchantCount {
      errors
      message
      payload
    }
  }
`;

export const TOTAL_CUSTOMER = gql`
  query {
    AdminFetchCustomerCount {
      errors
      message
      payload
    }
  }
`;

export const RIDERS_COUNT = gql`
  query {
    AdminFetchRiderCount {
      errors
      message
      payload
    }
  }
`;
export const REVENUE = gql`
  query {
    MerchantsTotalRevenueWithDeliveryFee {
      errors
      message
      payload
    }
  }
`;
