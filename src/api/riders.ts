import { gql } from "@apollo/client";

export const ADMIN_FETCH_ALL_RIDERS = gql`
  query ADMIN_FETCH_ALL_RIDERS {
    RiderOutput {
      id
      riderId
      name
      phoneNumber
      email
      status
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
