import React from "react";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
  className?: string;
};

interface SelectFieldProps {
  control: Control<any>;
  name?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  items?: Option[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  control,
  description,
  placeholder,
  name,
  label,
  items,
}) => {
  return (
    <FormField
      control={control}
      name={name ? name?.toString() : ""}
      render={({ field }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel className="text-sm lg:text-base text-primary-dark font-medium">
                {label}
              </FormLabel>
            )}
            <Select onValueChange={field.onChange} value={field.value || ""} key={field.value ? "loaded" : "loading"}>
              <FormControl>
                <SelectTrigger className="w-full py-6 rounded-lg focus:border-primary  focus-visible:border-primary placeholder:text-text-secondary">
                  <SelectValue
                    placeholder={placeholder?.toLowerCase()}
                    className="text-text-primary  text-sm lg:text-base"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="w-full border-[#D4C7EE]">
                <SelectGroup>
                  {items && items.length > 0 ? (
                    items?.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className={item?.className}
                      >
                        {item.label}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="py-2 px-4 text-sm text-muted-foreground">
                      No item found
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SelectField;
