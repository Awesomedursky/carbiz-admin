import { gql } from "@apollo/client";

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
        }
      }
    }
  }
`;
