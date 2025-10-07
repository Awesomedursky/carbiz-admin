import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputField from "@/components/atoms/form/input";

import ProfileSchema, { ProfileSchemaType } from "@/schema/profile.schema";
import { useAuthStore } from "@/store/auth.store";
import useAdminMutation from "@/queries/profile";
import ImagePicker from "@/components/atoms/form/imagepicker";

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

  const onSubmit = (data: ProfileSchemaType) => {
    console.log(data);

    const payload = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      profilePictureUrl: data.profilePics,
    };
    mutate({ variables: { input: payload } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-lg">
          <ImagePicker
            control={form.control}
            name="image"
            label="Profile Picture"
            defaultValue={user?.profilePics}
            onChange={(value: string) =>
              form.setValue("profilePics", value)
            }
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

        <Button
          type="submit"
          className={`${
            loading ? "bg-primary/10" : "bg-primary"
          } text-white px-7 md:py-7 rounded-[0.625rem] text-base w-[16%]`}
          disabled={loading}
        >
          {loading ? "Updating" : "Edit"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
