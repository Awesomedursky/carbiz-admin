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
        email
        firstName
        isApproved
        isVerified
        lastName
        riderID
        role
        profilePics
        phoneNumber
        updatedAt
        governmentVerificationNumber
        governmentVerificationType
        my_rides {
          order {
            orderID
          }
        }
        my_payouts {
          payoutID
          payoutStatus
        }
        vehicle {
          vehicleDocuments
          driversLicense
          plateNumber
          vehicleType
          vehicleID
        }
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

export const ADMIN_FETCH_ALL_AVAILABLE_RIDERS = gql`
  query AdminFetchAllAvailableRiders($params: PaginationDto!) {
    AdminFetchAllAvailableRiders(paginationQuery: $params) {
      success
      message
      status
      errors
      payload {
        currentPage
        pageSize
        total
        data {
          riderID
          firstName
          lastName
          status
        }
      }
    }
  }
`;

export const ADMIN_ASSIGN_RIDER_TO_ORDER = gql`
  mutation AdminAssignAnOrderToArider($orderID: String!, $riderID: String!) {
    AdminAssignAnOrderToArider(orderID: $orderID, riderID: $riderID) {
      success
      message
      status
      errors
      payload
    }
  }
`;
