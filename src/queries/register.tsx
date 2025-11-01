import { REGISTER_ADMIN } from "@/api/auth";
import { useToast } from "@/hooks/Toast";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

interface signUpAdminInput {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface signUpAdmin {
  signUpAdmin: {
    payload: {
      name: string;
      email: string;
      role: string;
    };
    phoneNumber: string;
    password: string;
    message: string;
    success: boolean;
  };
}

export const useRegisterMerchant = () => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const navigate = useNavigate();

  const [signupAdmin, { loading }] = useMutation<
    signUpAdmin,
    { input: signUpAdminInput }
  >(REGISTER_ADMIN, {
    onCompleted: (data) => {
      const result = data?.signUpAdmin;

      if (!result) {
        handleError(new Error("No response received"), "Signup failed");
        return;
      }

      if (!result.success) {
        handleInfo("Signup info", result.message || "Signup unsuccessful");
        return;
      }

      // If success
      handleSuccess("Registration successful", result.message);
      navigate("/verify-otp", { state: { email: result?.payload?.email } });
    },

    onError: (error) => {
      // Handles GraphQL errors or network issues
      handleError(error, "Registration failed");
      console.log("Mutation Error:", error);
    },
  });

  return { signupAdmin, loading };
};
