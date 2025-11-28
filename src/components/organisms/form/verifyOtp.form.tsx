import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router";

import { Form } from "@/components/ui/form";
import FormOtpInput from "@/components/atoms/form/otpinput";

import VerifyOtpSchema, {
  VerifyOtpSchemaType,
} from "@/schema/verifyotp.schema";
import { toast } from "sonner";
import { useVerifyOtpAdmin } from "@/queries/verifyOtp";
import { useToast } from "@/hooks/Toast";
import CustomButton from "@/components/atoms/button/CustomButton";

function VerifyOtpForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const form = useForm<VerifyOtpSchemaType>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { handleError } = useToast();
  const { state } = useLocation();

  const {
    verifyOtpAdmin,
    resendOtpAdmin,
    loading,
    verifyResetPasswordOtpAdmin,
    verifyResetOtpLoading,
  } = useVerifyOtpAdmin();

  const onSubmit = async (data: VerifyOtpSchemaType) => {
    if (pathname === "/reset-otp") {
      // if (state === null || state === undefined) {
      //   handleError(new Error("No email provided"), "Resend OTP failed");
      //   navigate("/forgot-password");
      //   return;
      // }
      await verifyResetPasswordOtpAdmin({
        variables: { input: { otp: data?.otp } },
      });
      return;
    }
    await verifyOtpAdmin({ variables: { input: { otp: data?.otp } } });
  };

  const handleOtpResend = async () => {
    if (state === null || state === undefined) {
      handleError(new Error("No email provided"), "Resend OTP failed");
      navigate("/forgot-password");
      return;
    }
    form.setValue("otp", "");
    toast.promise(
      resendOtpAdmin({ variables: { input: { email: state.email } } }),
      {
        loading: "Sending OTP...",
        success: (data) => {
          const result = data?.data?.resendOtpAdmin;
          return result?.message || "OTP sent!";
        },
        error: (err) => {
          return err.message || "Failed to resend OTP.";
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-10 mt-4"
      >
        <div className="flex flex-col gap-2.5">
          <FormOtpInput
            control={form.control}
            name="otp"
            label="Verification Code"
            maxLength={6}
          />
          <p className="font-family-satoshi text-sm">
            Didn’t get a code?{" "}
            <button
              onClick={handleOtpResend}
              type="button"
              className="text-primary cursor-pointer"
            >
              Click to get code again
            </button>
          </p>
        </div>

        <CustomButton
          loading={loading || verifyResetOtpLoading}
          className="bg-primary text-white w-full mt-10 py-6 rounded-[0.625rem] text-base"
        >
          Submit
        </CustomButton>
      </form>
    </Form>
  );
}

export default VerifyOtpForm;
