import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../types";

type Props = {
  form: UseFormReturn<FormData>;
};

export function SessionPriceSection({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input 
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputMode="decimal"
              min={0}
              step="0.01"
              {...field}
              value={field.value}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  field.onChange(value === "" ? "" : parseFloat(value));
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