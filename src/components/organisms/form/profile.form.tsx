import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import InputField from "@/components/atoms/form/input";

import ProfileSchema, { ProfileSchemaType } from "@/schema/profile.schema";
import { useAuthStore } from "@/store/auth.store";
import useAdminMutation from "@/queries/profile";
import ImagePicker from "@/components/atoms/form/imagepicker";
import CustomButton from "@/components/atoms/button/CustomButton";

const ProfileForm = () => {
  const { user } = useAuthStore();
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      profilePics: user?.profilePics,
    },
  });

  const { updateAdminProfile } = useAdminMutation();
  const { loading, mutate } = updateAdminProfile();

  const onSubmit = async (data: ProfileSchemaType) => {
    console.log(data);
    const payload = {
      name: data?.name,
      phoneNumber: data?.phoneNumber,
      profilePictureUrl: data?.profilePics,
    };
    await mutate({ variables: { input: payload } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-lg">
          <ImagePicker
            name="profilePics"
            defaultValue={user?.profilePics}
            control={form.control}
            label="Profile Picture"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mb-5">
          <InputField
            control={form.control}
            name="name"
            label="Name"
            placeholder="John Doe"
          />

          <InputField
            control={form.control}
            name="email"
            type="email"
            label="Email"
            placeholder="john.doe@example.com"
            disabled
          />

          <InputField
            control={form.control}
            name="phoneNumber"
            type="tel"
            label="Phone Number"
            placeholder="+234"
          />
        </div>

        <CustomButton
          // type="submit"
          className={` text-white px-7 md:py-7 rounded-[0.625rem] text-base`}
          loading={loading}
        >
          Update Profile
        </CustomButton>
      </form>
    </Form>
  );
};

export default ProfileForm;
