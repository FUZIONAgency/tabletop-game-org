import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface SessionFormProps {
  campaignId: string;
  onSuccess: () => void;
}

const formSchema = z.object({
  session_number: z.coerce.number().min(1, "Session number is required"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
});

type FormData = z.infer<typeof formSchema>;

export const SessionForm = ({ campaignId, onSuccess }: SessionFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      session_number: 1,
      description: "",
      start_date: "",
      price: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase.from("sessions").insert({
        campaign_id: campaignId,
        session_number: data.session_number,
        description: data.description,
        start_date: data.start_date,
        price: data.price,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Session has been added successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["sessions", campaignId] });
      onSuccess();
    } catch (error) {
      console.error("Error adding session:", error);
      toast({
        title: "Error",
        description: "Failed to add session. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <div className="flex justify-end gap-4">
          <Button type="submit">Add Session</Button>
        </div>
      </form>
    </Form>
  );
};