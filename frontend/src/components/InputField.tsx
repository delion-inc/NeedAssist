/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/styles/ui/form";
import { Input } from "@/app/styles/ui/input";
import { RegisterFormData } from "@/types/auth.interface";
import { Control, Path } from "react-hook-form";

type InputFieldProps = {
   control: Control<RegisterFormData>;
   name: Path<RegisterFormData>;
   label: string;
   type: string;
   placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({ control, name, label, type, placeholder }) => (
   <FormField
      control={control}
      name={name}
      render={({ field }) => (
         <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
               <Input className="transition" value={field.value} onChange={field.onChange} type={type} placeholder={placeholder}></Input>
            </FormControl>
            <FormMessage />
         </FormItem>
      )}
   ></FormField>
);

export default InputField;
