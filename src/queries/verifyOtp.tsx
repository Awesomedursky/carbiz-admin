import { RESEND_OTP, VERIFY_OTP, VERIFY_RESET_OTP } from "@/api/auth";
import { useToast } from "@/hooks/Toast";
import { VerifyOtpSchemaType } from "@/schema/verifyotp.schema";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

interface otpResponse {
  verifyOtpAdmin: {
    businessName: string;
    email: string;
    isVerified: boolean;
    success?: boolean;
    message?: string;
  };
}

interface verifyResetPasswordOtpAdmin {
  verifyResetPasswordOtpAdmin: {
    success?: boolean;
    message?: string;
    payload?: string;
  };
}

interface resendOtpAdmin {
  resendOtpAdmin: {
    success?: boolean;
    message?: string;
  };
}

export const useVerifyOtpAdmin = () => {
  const navigate = useNavigate();
  const { handleError, handleInfo, handleSuccess } = useToast();

  /* ------------------------VERIFY OTP HOOK----------------------------*/
  const [verifyOtpAdmin, { loading }] = useMutation<
    otpResponse,
    { input: VerifyOtpSchemaType }
  >(VERIFY_OTP, {
    onCompleted: (data) => {
      const result = data?.verifyOtpAdmin;
      if (!result) {
        handleError(
          new Error("No response received"),
          "Error in verifying OTP"
        );
        return;
      }
      if (!result.success) {
        handleInfo(
          "Invalid OTP",
          result.message || "OTP verification unsuccessful"
        );
        return;
      }

      // If success
      handleSuccess("OTP successfully verified", result.message);
      navigate("/congratulations");
    },
    onError: (error) => {
      // Handles GraphQL errors or network issues
      handleError(error, "OTP verification failed");
    },
  });

  /* ------------------------VERIFY RESET OTP HOOK----------------------------*/
  const [verifyResetPasswordOtpAdmin, { loading: verifyResetOtpLoading }] =
    useMutation<verifyResetPasswordOtpAdmin, { input: VerifyOtpSchemaType }>(
      VERIFY_RESET_OTP,
      {
        onCompleted: (data) => {
          const result = data?.verifyResetPasswordOtpAdmin;
          if (!result) {
            handleError(
              new Error("No response received"),
              "Error in verifying OTP"
            );
            return;
          }
          if (!result.success) {
            handleInfo(
              "Invalid OTP",
              result.message || "OTP verification unsuccessful"
            );
            return;
          }

          // If success
          handleSuccess("OTP successfully verified", result.message);
          navigate("/congratulations_");
        },
        onError: (error) => {
          // Handles GraphQL errors or network issues
          handleError(error, "OTP verification failed");
        },
      }
    );

  /* ------------------------RESEND OTP HOOK----------------------------*/
  const [resendOtpAdmin] = useMutation<
    resendOtpAdmin,
    { input: { email: string } }
  >(RESEND_OTP, {
    onCompleted: (data) => {
      const result = data?.resendOtpAdmin;
      if (!result) {
        handleError(new Error("No response received"), "Error sending OTP");
        return;
      }
      if (!result.success) {
        handleInfo(result.message || "OTP verification unsuccessful");
        return;
      }
      // If success
      handleSuccess(result?.message?.toLocaleUpperCase() || "");
    },
    onError: (error) => {
      // Handles GraphQL errors or network issues
      handleError(error, "OTP request failed");
      console.log("Mutation Error:", error);
    },
  });

  return {
    verifyOtpAdmin,
    resendOtpAdmin,
    loading,
    verifyResetPasswordOtpAdmin,
    verifyResetOtpLoading,
  };
};
