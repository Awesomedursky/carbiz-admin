import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputField from "@/components/atoms/form/input";

import RegistrationSchema, {
  RegistrationSchemaType,
} from "@/schema/registration.schema";
// import FormCheckbox from "@/components/atoms/form/checkbox";
// import { Link } from "react-router";
import { useRegisterMerchant } from "@/queries/register";
// import ProfileImageUpload from "@/components/atoms/form/profileImageUpload";

const RegisterForm = () => {
  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegistrationSchema),
  });

  const { signupAdmin, loading } = useRegisterMerchant();

  const onSubmit = async (data: RegistrationSchemaType) => {
    await signupAdmin({
      variables: {
        input: {
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-2 lg:mt-4"
      >
        <InputField
          control={form.control}
          name="name"
          label="Business Name"
          placeholder="John Doe"
        />
        <InputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="john.doe@example.com"
        />
        <InputField
          control={form.control}
          name="phoneNumber"
          type="tel"
          label="Phone Number"
          placeholder="+234"
        />
        <InputField
          control={form.control}
          name="password"
          type="password"
          label="Create Password"
          placeholder="Create a password"
        />
        {/* <ProfileImageUpload name="profileImage" control={form.control} /> */}

        {/* <div className="2xl:py-4">
          <FormCheckbox
            control={form.control}
            name="agreement"
            description={
              <div className="text-sm text-text-secondary text-left font-normal">
                I hereby confirm that I have read and agree to the{" "}
                <Link to="" className="text-primary">
                  Carbiz Seller Contract
                </Link>
                , including its{" "}
                <Link to="" className="text-primary">
                  terms, policies
                </Link>
                , and{" "}
                <Link to="" className="text-primary">
                  referenced privacy provisions
                </Link>
                `.
              </div>
            }
          />
        </div> */}
        <Button
          disabled={loading}
          type="submit"
          // onClick={handleClick}
          className="bg-primary text-white w-full py-6 rounded-[0.625rem] text-base flex items-center justify-center "
        >
          {loading ? "Loading..." : " Sign up"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
