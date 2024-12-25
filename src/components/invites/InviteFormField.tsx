import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { InviteFormData } from "./useInviteForm";

interface InviteFormFieldProps {
  form: UseFormReturn<InviteFormData>;
  name: keyof InviteFormData;
  label: string;
  placeholder: string;
  required?: boolean;
}

export const InviteFormField = ({ 
  form, 
  name, 
  label, 
  placeholder,
  required = true 
}: InviteFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{required && "*"}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};