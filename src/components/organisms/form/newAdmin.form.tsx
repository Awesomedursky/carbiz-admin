import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import InputField from "@/components/atoms/form/input";
import CustomButton from "@/components/atoms/button/CustomButton";
import SelectField from "@/components/atoms/form/select";
import AddAdminSchema, { AddAdminSchemaType } from "@/schema/addAdminSchema";

const LoginForm = () => {
  const form = useForm<AddAdminSchemaType>({
    resolver: zodResolver(AddAdminSchema),
  });

  const onSubmit = async (data: AddAdminSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 mt-4">
        <InputField
          control={form.control}
          name="name"
          type="name"
          label="Name"
          placeholder="enter first name and last name"
        />
        <InputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="enter email address"
        />
        <SelectField
          control={form.control}
          name="role"
          placeholder="select role"
          items={[]}
        />

        <div className="flex space-x-2 mt-2">
          <CustomButton variant="outline">Cancel</CustomButton>

          <CustomButton
            // loading={loading}
            className="bg-primary text-white w-full mt-10 py-6 rounded-[0.625rem] text-base"
          >
            Login
          </CustomButton>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
