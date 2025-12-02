import { RESET_PASSWORD } from "@/api/auth";
import { useToast } from "@/hooks/Toast";
import { useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router";

interface resetPasswordInput {
  email: string;
  password: string;
  confirmPassword: string;
}

interface resetPasswordAdmin {
  resetPasswordAdmin: {
    payload: boolean;
    message: string;
    success: boolean;
  };
}

export const useResetPassword = () => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [resetPasswordAdmin, { loading }] = useMutation<
    resetPasswordAdmin,
    { input: resetPasswordInput }
  >(RESET_PASSWORD, {
    onCompleted: (data) => {
      const result = data?.resetPasswordAdmin;

      if (!result) {
        handleError(new Error("No response received"), "Reset password failed");
        return;
      }

      if (!result.success) {
        handleInfo("Reset Password", result.message || "Reset unsuccessful");
        return;
      }

      // If success
      handleSuccess("Reset Password successful", result.message);
      navigate("/reset-otp", { state });
    },

    onError: (error) => {
      // Handles GraphQL errors or network issues
      handleError(error, "Reset Password failed");
    },
  });

  return { resetPasswordAdmin, loading };
};
