import { gql } from "@apollo/client";

export const PROFILE_ADMIN = gql`
  query {
    profileAdmin {
      errors
      message
      payload {
        adminID
        createdAt
        deletedAt
        email
        id
        isVerified
        name
        phoneNumber
        profilePics
        role
        status
        updatedAt
      }
    }
  }
`;

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
