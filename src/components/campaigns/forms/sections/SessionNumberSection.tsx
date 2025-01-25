import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../types";

type Props = {
  form: UseFormReturn<FormData>;
};

export function SessionNumberSection({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="session_number"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Session Number</FormLabel>
          <FormControl>
            <Input 
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              min={1}
              {...field}
              value={field.value}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d+$/.test(value)) {
                  field.onChange(value === "" ? "" : parseInt(value, 10));
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}