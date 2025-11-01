import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface TextAreaProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  textareaClassName?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  control,
  placeholder,
  description,
  label,
  textareaClassName,
}) => {
  return (
    <FormField
      control={control}
      name={name ? name?.toString() : ""}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm lg:text-base text-primary-dark font-medium">
              {label}
            </FormLabel>
          )}

          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={`text-sm lg:text-base rounded-lg  focus:outline-0 focus-visible:ring-0 focus-visible:border-primary placeholder:text-text-secondary !resize-none max-h-[10px] scrollbar-hide  ${textareaClassName}`}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextArea;
