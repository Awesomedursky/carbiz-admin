import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputField from "@/components/atoms/form/input";
import { useLocation } from "react-router";
import ResetPasswordSchema, {
  ResetPasswordType,
} from "@/schema/resetPassword.schema";
import { useResetPassword } from "@/queries/resetPassword";

const ResetPasswordForm = () => {
  const { state } = useLocation();
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { resetPasswordAdmin, loading } = useResetPassword();
  interface StateType extends ResetPasswordType {
    email: string;
  }

  const onSubmit = async (data: ResetPasswordType) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    const payload: StateType = {
      email: state.email,
      ...data,
    };
    await resetPasswordAdmin({
      variables: { input: payload },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 mt-4">
        <InputField
          control={form.control}
          name="password"
          type="password"
          label="Password"
          placeholder="******************"
        />
        <InputField
          control={form.control}
          name="confirmPassword"
          type="password"
          label="Enter Password Again"
          placeholder="******************"
        />
        <Button
          disabled={loading}
          type="submit"
          className="bg-primary text-white w-full mt-10 py-6 rounded-[0.625rem] text-base"
        >
          {loading ? "Loading..." : "Proceed"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
