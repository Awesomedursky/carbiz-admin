import React from "react";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CurrencyOption = {
  label: string;
  value: string;
};

interface ProductPriceInputProps {
  control: Control<any>;
  inputName: string;
  selectName: string;
  label?: string;
  currencyOptions?: CurrencyOption[];
  placement?: boolean;
  placeholder?: string;
}

const SelectInput: React.FC<ProductPriceInputProps> = ({
  control,
  placeholder,
  placement = false,
  inputName,
  selectName,
  label = "Product price",
  currencyOptions = inputName === "price"
    ? [
        { label: "₦", value: "NGN" },
        { label: "$", value: "USD" },
        { label: "€", value: "EUR" },
      ]
    : [
        { label: "KG", value: "Kg" },
        { label: "Pounds", value: "Pounds" },
        { label: "Ton", value: "Ton" },
        { label: "Ounce", value: "Ounce" },
        { label: "Gram", value: "Gram" },
        { label: "Milligram", value: "Milligram" },
      ],
}) => {
  return (
    <FormItem>
      {label && (
        <FormLabel className="text-sm lg:text-base text-primary-dark font-medium">
          {label}
        </FormLabel>
      )}
      <div
        className={`flex items-center border-1 border-input shadow-xs rounded-lg px-2 py-1.5 max-h-max focus-within:ring-0 focus-within:border-primary  ${
          placement ? "flex-row-reverse" : ""
        }`}
      >
        {/* Currency Select */}
        <FormField
          control={control}
          name={selectName}
          render={({ field, fieldState }) => (
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={` border-none shadow-none px-0 focus:ring-0 focus:ring-offset-0 text-muted-foreground focus:border-0  border-0 outline-0 ring-0 ${
                    fieldState.error ? "border-red-500" : "border-border"
                  }`}
                >
                  <SelectValue
                    placeholder={inputName === "price" ? "₦" : "KG"}
                  />
                </SelectTrigger>
                <SelectContent className=" !max-w-2">
                  {currencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          )}
        />
        {/* Price Input */}
        <FormField
          control={control}
          name={inputName}
          render={({ field }) => (
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder={placeholder ?? "0.00"}
                className="text-sm lg:text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-0 w-full pl-2 border shadow-none"
              />
            </FormControl>
          )}
        />
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default SelectInput;
