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
import { sessionFormSchema, SessionFormData } from "./forms/types";

interface SessionFormProps {
  campaignId: string;
  onSuccess?: () => void;
}

export const SessionForm = ({ campaignId, onSuccess }: SessionFormProps) => {
  const { toast } = useToast();

  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      session_number: undefined,
      description: "",
      start_date: "",
      price: undefined,
    },
  });

  const onSubmit = async (data: SessionFormData) => {
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
        <SessionNumberSection register={form.register} errors={form.formState.errors} />
        <SessionDescriptionSection register={form.register} errors={form.formState.errors} />
        <SessionDateSection form={form} />
        <SessionPriceSection register={form.register} errors={form.formState.errors} />
        
        <Button type="submit" className="w-full">
          Create Session
        </Button>
      </form>
    </Form>
  );
};