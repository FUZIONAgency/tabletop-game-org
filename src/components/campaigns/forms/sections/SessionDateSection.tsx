import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../types";

type Props = {
  form: UseFormReturn<FormData>;
};

export function SessionDateSection({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="start_date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Start Date</FormLabel>
          <FormControl>
            <Input type="datetime-local" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}