import { gql } from "@apollo/client";

export const REGISTER_ADMIN = gql`
  mutation signUpAdmin($input: SignupAdminDto!) {
    signUpAdmin(input: $input) {
      success
      message
      payload {
        name
        email
        role
      }
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOtpAdmin($input: VerifyOtp!) {
    verifyOtpAdmin(input: $input) {
      success
      message
      payload {
        name
        email
        isVerified
        role
      }
    }
  }
`;
export const VERIFY_RESET_OTP = gql`
  mutation verifyResetPasswordOtpAdmin($input: VerifyOtp!) {
    verifyResetPasswordOtpAdmin(input: $input) {
      success
      message
      payload
    }
  }
`;

export const RESEND_OTP = gql`
  mutation resendOtpAdmin($input: ResendExpiredOtp!) {
    resendOtpAdmin(input: $input) {
      success
      message
      payload
    }
  }
`;
export const LOGIN = gql`
  mutation loginAdmin($input: LoginDto!) {
    loginAdmin(input: $input) {
      success
      message
      payload {
        token
        user {
          name
          email
          role
        }
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPasswordAdmin($input: ResetPasswordDto!) {
    resetPasswordAdmin(input: $input) {
      success
      message
      payload
    }
  }
`;
