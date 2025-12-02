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
        adminAccess
      }
    }
  }
`;

export const FETCH_ONE_ADMIN = gql`
  query AdminFetchOneOtherAdmin($adminID: String!) {
    AdminFetchOneOtherAdmin(adminID: $adminID) {
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
        adminAccess
        isVerified
        my_completed_payouts {
          completedOn
          createdAt
          grossSaleAmount
          invoiceStatus
          merchant {
            businessName
          }
          paymentReceipt
          paymentStatus
          payoutAt
          payoutID
        }
      }
    }
  }
`;

export const UPDATE_CURRENT_USER_PROFILE = gql`
  mutation updateAdmin($input: updateAdminDto!) {
    updateAdmin(input: $input) {
      success
      message
      payload {
        name
        phoneNumber
        profilePics
      }
    }
  }
`;

export const FETCH_ALL_ADMINS = gql`
  query AdminFetchAllAdmins($params: PaginationDto!) {
    AdminFetchAllAdmins(paginationQuery: $params) {
      errors
      message
      payload {
        currentPage
        pageSize
        total
        data {
          adminID
          createdAt
          email
          name
          phoneNumber
          role
          status
          adminAccess
          profilePics
        }
      }
    }
  }
`;

export const ADD_ADMIN = gql`
  mutation createOtherAdmin($input: RegisterOtherAdminDto!) {
    createOtherAdmin(input: $input) {
      success
      message
      payload
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation updateOtherAdmin($adminID: String!, $input: UpdateOtherAdminDto!) {
    updateOtherAdmin(adminID: $adminID, input: $input) {
      success
      message
      payload {
        name
        phoneNumber
        profilePics
      }
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation AdminDeleteOtherAdmin($adminID: String!) {
    AdminDeleteOtherAdmin(adminID: $adminID) {
      success
      message
      payload
    }
  }
`;
