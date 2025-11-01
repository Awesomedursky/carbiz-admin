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
