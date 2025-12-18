"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDrawerStore } from "@/store/drawer.store";
import GenericDisable from "../genericDisable";
import { productCategoryType } from "@/queries/product-categories.query";
import { ProductCategoryDetails } from "./productCategoryDetails";
import CategoryForm from "@/components/organisms/form/categoryForm";

const ProductCategoryActions: React.FC<{
  category: productCategoryType;
}> = ({ category }) => {
  const { openModal } = useDrawerStore();

  /** --- RENDER --- **/
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 focus:outline-none"
        >
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-50">
        <DropdownMenuItem
          onSelect={() => {
            openModal({
              type: "drawer",
              title: "Product Category Details",
              content: ProductCategoryDetails,
              props: { id: category.productCategoryID },
              placement: "right",
            });
          }}
        >
          View
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            openModal({
              type: "dialog",
              content: CategoryForm,
              props: {
                type: true,
                id: category?.productCategoryID,
              },
            });
          }}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            openModal({
              type: "dialog",
              title: "Product Category",
              content: GenericDisable,
              props: {
                type: "delete",
                itemName: "Product-Category",
                id: category.productCategoryID,
                name: category.productCategoryName,
                state: "product-category",
              },
              placement: "center",
            });
          }}
          className="text-red-600"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductCategoryActions;
