import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SessionNumberSection } from "./forms/sections/SessionNumberSection";
import { SessionDescriptionSection } from "./forms/sections/SessionDescriptionSection";
import { SessionDateSection } from "./forms/sections/SessionDateSection";
import { SessionPriceSection } from "./forms/sections/SessionPriceSection";
import { formSchema, FormData } from "./forms/types";

interface SessionFormProps {
  campaignId: string;
  onSuccess?: () => void;
}

export const SessionForm = ({ campaignId, onSuccess }: SessionFormProps) => {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      session_number: undefined,
      description: "",
      start_date: "",
      price: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from("sessions")
        .insert({
          campaign_id: campaignId,
          session_number: data.session_number,
          description: data.description,
          start_date: data.start_date,
          price: data.price,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Session created successfully",
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating session:", error);
      toast({
        title: "Error",
        description: "Failed to create session",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SessionNumberSection form={form} />
        <SessionDescriptionSection form={form} />
        <SessionDateSection form={form} />
        <SessionPriceSection form={form} />
        
        <Button type="submit" className="w-full">
          Create Session
        </Button>
      </form>
    </Form>
  );
};