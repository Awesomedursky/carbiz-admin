import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import InputField from "@/components/atoms/form/input";

import LoginSchema, { LoginSchemaType } from "@/schema/login.schema";
import { useLoginAdmin } from "@/queries/login";
import CustomButton from "@/components/atoms/button/CustomButton";

const LoginForm = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const { loginAdmin, loading } = useLoginAdmin();

  const onSubmit = async (data: LoginSchemaType) => {
    await loginAdmin({ variables: { input: data } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 mt-4">
        <InputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="john.doe@example.com"
        />
        <InputField
          control={form.control}
          name="password"
          type="password"
          label="Password"
          placeholder="******************"
        />
        <CustomButton
          loading={loading}
          className="bg-primary text-white w-full mt-10 py-6 rounded-[0.625rem] text-base"
        >
          Login
        </CustomButton>
      </form>
    </Form>
  );
};

export default LoginForm;
