import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputField from "@/components/atoms/form/input";

import ForgetPasswordSchema, {
  ForgetPasswordSchemaType,
} from "@/schema/forgetPassword.schema";
import { useNavigate } from "react-router";

const ForgetPasswordForm = () => {
  const form = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(ForgetPasswordSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: ForgetPasswordSchemaType) => {
    navigate("/reset-password", { state: { email: data.email } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 mt-4">
        <InputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="google@gmail.com"
        />

        <Button
          type="submit"
          className="bg-primary text-white w-full mt-10 py-6 rounded-[0.625rem] text-base cursor-pointer"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default ForgetPasswordForm;
