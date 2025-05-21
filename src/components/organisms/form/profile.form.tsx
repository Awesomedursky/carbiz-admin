import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputField from "@/components/atoms/form/input";

import ProfileSchema, { ProfileSchemaType } from "@/schema/profile.schema";
import SelectField from "@/components/atoms/form/select";

const ProfileForm = () => {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = (data: ProfileSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mb-5">
          <InputField
            control={form.control}
            name="name"
            label="Business Name"
            placeholder="John Doe"
          />
          <SelectField
            control={form.control}
            label="City"
            name="city"
            placeholder="Choose"
          />
          <InputField
            control={form.control}
            name="email"
            type="email"
            label="Email"
            placeholder="john.doe@example.com"
          />
          <SelectField
            control={form.control}
            label="Country"
            name="country"
            placeholder="Choose"
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
            name="postalCode"
            type="text"
            label="Postal Code"
            placeholder="Code"
          />
          <InputField
            control={form.control}
            name="street"
            type="text"
            label="Address"
            placeholder="Address"
          />
        </div>

        <Button
          type="submit"
          className="bg-primary text-white px-7 md:py-7 rounded-[0.625rem] text-base w-[16%]"
        >
          Edit
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
