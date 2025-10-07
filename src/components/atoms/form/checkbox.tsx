import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface CheckboxProps {
  control: Control<any>;
  id?: string;
  label?: string;
  description?: React.ReactNode;
  name?: string;
}

const FormCheckbox: React.FC<CheckboxProps> = ({
  control,
  id,
  label,
  description,
  name,
}) => {
  return (
    <FormField
      control={control}
      name={name ? name : ""}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start lg:space-x-3 space-y-0 rounded-md">
          <FormControl>
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div
            className={`${description && label && "space-y-1"} leading-none`}
          >
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
