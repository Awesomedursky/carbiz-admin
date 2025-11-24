import { gql } from "@apollo/client";

export const ADMIN_FETCH_ALL_RIDERS = gql`
  query AdminFetchAllRiders($params: PaginationDto!) {
    AdminFetchAllRiders(paginationQuery: $params) {
      success
      message
      status
      errors
      payload {
        currentPage
        pageSize
        total
        data {
          status
          availabilityStatus
          createdAt
          deletedAt
          email
          firstName
          isApproved
          isVerified
          lastName
          riderID
          phoneNumber
          updatedAt
        }
      }
    }
  }
`;

export const ADMIN_FETCH_ONE_RIDER = gql`
  query AdminFetchOneRider($riderID: String!) {
    AdminFetchOneRider(riderID: $riderID) {
      success
      message
      status
      errors
      payload {
        status
        availabilityStatus
        createdAt
        deletedAt
        email
        firstName
        isApproved
        isVerified
        lastName
        riderID
        phoneNumber
        updatedAt
      }
    }
  }
`;

export const ADMIN_APPROVE_OR_DISAPPROVE_RIDER = gql`
  mutation AdminApproveOrDisApproveRider(
    $riderID: String!
    $approve: ApproveUserDto!
  ) {
    AdminApproveOrDisApproveRider(riderID: $riderID, approve: $approve) {
      success
      message
      status
      errors
      payload {
        availabilityStatus
      }
    }
  }
`;
