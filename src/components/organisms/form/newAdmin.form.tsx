import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import InputField from "@/components/atoms/form/input";
import CustomButton from "@/components/atoms/button/CustomButton";
import SelectField from "@/components/atoms/form/select";
import AddAdminSchema, { AddAdminSchemaType } from "@/schema/addAdminSchema";
import {
  useAddAdmin,
  useFetchOneAdmin,
  useUpdateAdmin,
} from "@/queries/admin.query";
import { Copy } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import React from "react";
import { useToast } from "@/hooks/Toast";
import { useDrawerStore } from "@/store/drawer.store";
import { Spinner } from "@/components/ui/spinner";

const NewAdminForm = ({ type, id }: { type: boolean; id?: string }) => {
  const { generatedPassword, setGeneratedPassword } = useAuthStore();
  const { handleSuccess } = useToast();
  const { closeModal } = useDrawerStore();
  const { addAdmin, loading } = useAddAdmin();
  const { mutate, updateLoading } = useUpdateAdmin();
  const { data: adminData, loading: fetchLoading } = useFetchOneAdmin(
    id!,
    !type || !id
  );

  const form = useForm<AddAdminSchemaType>({
    resolver: zodResolver(
      AddAdminSchema.refine(
        (values) => {
          if (!type && !values.adminAccess) return false;
          return true;
        },
        { message: "Role is required" }
      )
    ),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      adminAccess: "",
      password: "",
    },
  });

  React.useEffect(() => {
    if (type && adminData) {
      form.reset({
        name: adminData?.name,
        email: adminData?.email,
        phoneNumber: adminData?.phoneNumber,
      });
    }
  }, [adminData, type]);

  React.useEffect(() => {
    if (generatedPassword) {
      form.setValue("password", generatedPassword);
    }
  }, [generatedPassword]);

  const handleCopy = () => {
    const value = form.getValues("password");
    if (value) {
      navigator.clipboard.writeText(value);
      handleSuccess(
        "Password Copied Successfully",
        `${value} copied to clipboard`
      );
      closeModal();
      setGeneratedPassword("");
    }
  };

  const onSubmit = async (data: AddAdminSchemaType) => {
    if (type && id) {
      const { adminAccess, password, ...editData } = data;
      mutate({
        variables: {
          adminID: id,
          input: editData,
        },
      });
      return;
    }
    const { password, ...createData } = data;
    addAdmin({ variables: { input: createData } });
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Spinner className="size-14 text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div>
          <div className=" flex items-center flex-col">
            <h3 className=" text-base md:text-lg font-bold mx-auto">
              {type ? "Edit Admin" : "Add New Admin"}
            </h3>
            <p className="mx-auto text-sm ">
              Fill the correct information in the field provided below.
            </p>
          </div>
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

          <InputField
            control={form.control}
            name="phoneNumber"
            type="number"
            label="Phone Number"
            placeholder="enter phone number"
          />

          {!type && (
            <>
              <SelectField
                label="Role"
                control={form.control}
                name="adminAccess"
                placeholder="select role"
                items={[
                  { label: "Admin", value: "Admin" },
                  { label: "Sub Admin", value: "Sub_Admin" },
                ]}
              />
              <InputField
                label="Password"
                type="text"
                name="password"
                placeholder="password will be generated"
                disabled
                iconRight={
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!form.watch("password")}
                    className={`p-1 rounded ${
                      form.watch("password")
                        ? "cursor-pointer text-primary"
                        : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <Copy size={18} />
                  </button>
                }
              />
            </>
          )}

          <div className="flex space-x-2 mt-2 justify-end">
            <CustomButton variant="outline" type="button" onClick={closeModal}>
              Cancel
            </CustomButton>

            <CustomButton
              loading={loading || updateLoading}
              className="bg-primary text-white rounded-[0.625rem] text-base"
            >
              {type ? "Edit Admin" : "Create Admin"}
            </CustomButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewAdminForm;
