import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/atoms/form/input";
import CustomButton from "@/components/atoms/button/CustomButton";
import React from "react";
import { useDrawerStore } from "@/store/drawer.store";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import {
  useAddProductCategory,
  useFetchOneProductCategory,
  useUpdateProductCategory,
} from "@/queries/product-categories.query";

export type Type = {
  productCategoryName: string;
  commissionRate: number;
};

const CategoryForm = ({ type, id }: { type: boolean; id?: string }) => {
  const { closeModal } = useDrawerStore();
  const { addProductCategory, loading: addLoading } = useAddProductCategory();
  const { mutate, updateLoading } = useUpdateProductCategory();
  const { data: productCategoryData, loading: fetchLoading } =
    useFetchOneProductCategory({ productCategoryID: id!, skip: !type || !id });

  const form = useForm<Type>({
    resolver: zodResolver(
      z.object({
        productCategoryName: z
          .string()
          .min(1, "Product Category Name is required"),
        commissionRate: z.coerce.number().min(0).max(100),
      })
    ),

    defaultValues: {
      productCategoryName: "",
      commissionRate: undefined,
    },
  });

  React.useEffect(() => {
    if (type && productCategoryData) {
      form.reset({
        productCategoryName: productCategoryData?.productCategoryName,
        commissionRate: productCategoryData?.commissionRate,
      });
    }
  }, [productCategoryData, type]);

  const onSubmit = async (data: Type) => {
    if (type && id) {
      mutate({
        variables: {
          productCategoryID: id,
          input: data,
        },
      });
      return;
    }
    addProductCategory({ variables: { input: data } });
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
              {type ? "Edit Product Category" : "Create Product Category"}
            </h3>
            <p className="mx-auto text-sm ">Enter the correct category name</p>
          </div>
          <InputField
            control={form.control}
            name="productCategoryName"
            type="text"
            label="Category Name"
            placeholder="eg. maintenance, accessory or part"
          />
          <InputField
            control={form.control}
            name="commissionRate"
            type="number"
            label="Commission Rate"
            placeholder="eg. 10 or 20"
          />

          <div className="flex space-x-2 mt-2 justify-end">
            <CustomButton variant="outline" type="button" onClick={closeModal}>
              Cancel
            </CustomButton>

            <CustomButton
              loading={addLoading || updateLoading}
              className="bg-primary text-white rounded-[0.625rem] text-base"
            >
              {type ? "Edit Category" : "Create Category"}
            </CustomButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
