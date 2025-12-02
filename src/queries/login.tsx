import { LOGIN } from "@/api/auth";
import { useToast } from "@/hooks/Toast";
import { useAuthStore } from "@/store/auth.store";
import { adminEntity } from "@/types";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

interface LoginResponseTypeAdmin {
  loginAdmin: {
    success: boolean;
    message: string;
    payload: {
      token: string;
      user: adminEntity;
    };
  };
}

interface loginType {
  email: string;
  password: string;
}

export const useLoginAdmin = () => {
  const navigate = useNavigate();
  const { handleError, handleInfo, handleSuccess } = useToast();
  const { setUser } = useAuthStore();

  const [loginAdmin, { loading }] = useMutation<
    LoginResponseTypeAdmin,
    { input: loginType }
  >(LOGIN, {
    onCompleted: (data) => {
      const result = data?.loginAdmin;
      if (!result) {
        handleError(new Error("Invalid"), "Error logging in");
        return;
      }
      if (!result.success) {
        handleInfo(result.message || "Login unsuccessful");
        return;
      }

      handleSuccess(result.message);
      navigate("/dashboard");
      sessionStorage.setItem("authToken", result.payload.token);
      setUser(result?.payload?.user);
    },
    onError: (error) => {
      handleError(error, "Login failed");
    },
  });

  return { loginAdmin, loading };
};
