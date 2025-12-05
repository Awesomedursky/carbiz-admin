import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";

// interface RadioOption {
//   label: string;
//   value: string;
//   description?: React.ReactNode;
// }

// interface FormRadioGroupProps {
//   control: Control<any>;
//   name: string;
//   label?: string;
//   description?: string;
//   options: RadioOption[];
// }

// const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
//   control,
//   name,
//   label,
//   description,
//   options,
// }) => {
//   return (
//     <div className="space-y-3">
//       {label && <FormLabel className="text-base">{label}</FormLabel>}
//       {description && <FormDescription>{description}</FormDescription>}

//       <FormField
//         control={control}
//         name={name}
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <RadioGroup
//                 onValueChange={field.onChange}
//                 value={field.value}
//                 className="flex flex-row items-center gap-10"
//               >
//                 {options.map((opt) => (
//                   <FormItem
//                     key={opt.value}
//                     className="flex flex-row items-center space-x-2"
//                   >
//                     <FormControl>
//                       <RadioGroupItem value={opt.value} />
//                     </FormControl>
//                     <FormLabel className="font-normal">{opt.label}</FormLabel>
//                   </FormItem>
//                 ))}
//               </RadioGroup>
//             </FormControl>
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// };

// export default FormRadioGroup;

interface FormRadioGroupProps {
  control: Control<any>;
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  renderRadio?: (value: string) => React.ReactNode; // NEW
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  control,
  name,
  label,
  options,
  renderRadio,
}) => {
  return (
    <div className="space-y-3">
      {label && <FormLabel className="text-base">{label}</FormLabel>}

      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex items-center gap-10"
          >
            {options.map((opt) => (
              <FormItem key={opt.value} className="flex items-center gap-2">
                <FormControl>
                  {renderRadio ? (
                    renderRadio(opt.value)
                  ) : (
                    <RadioGroupItem value={opt.value} />
                  )}
                </FormControl>
                <FormLabel className="font-normal">{opt.label}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
};

export default FormRadioGroup;
