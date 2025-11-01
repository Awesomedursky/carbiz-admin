import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";
import { Control } from "react-hook-form";
import { Link, useLocation } from "react-router";

interface InputFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  description?: string;
  inputClassName?: string;
  itemClassName?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  description,
  inputClassName,
  itemClassName,
  disabled,
}) => {
  const { pathname } = useLocation();

  const isCreatePage =
    pathname.includes("create-account") || pathname.includes("reset-password");

  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={`mb-0 py-2.5  ${itemClassName}`}>
          <div
            className={`${
              !isCreatePage && "flex justify-between items-center"
            }`}
          >
            {label && (
              <FormLabel className="text-sm lg:text-base text-primary-dark font-medium lg:mb-1">
                {label}
              </FormLabel>
            )}

            {!isCreatePage && type == "password" && (
              <Link to="/forgot-password" className="text-['#837E8E']">
                Forgot Password
              </Link>
            )}
          </div>
          <FormControl>
            <div
              className={`${
                type == "password" && "flex flex-row items-center"
              }`}
            >
              <Input
                placeholder={placeholder}
                type={showPassword && type == "password" ? "text" : type}
                className={`text-sm lg:text-base rounded-lg py-6 focus:outline-0 focus-visible:ring-0 focus-visible:border-primary placeholder:text-text-secondary ${
                  fieldState.error ? "border-red-500" : "border-border"
                }  ${inputClassName}`}
                disabled={disabled}
                {...field}
              />

              {type == "password" && (
                <button
                  type="button"
                  className="-ml-10 text-text-secondary"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
