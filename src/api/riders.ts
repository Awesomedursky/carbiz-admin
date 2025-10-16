import { gql } from "@apollo/client";

export const ADMIN_FETCH_ALL_RIDERS = gql`
  query AdminFetchAllRiders {
    RiderOutput {
      riderId
      email
      phoneNumber
      status
      updatedAt
    }
  }
`;
