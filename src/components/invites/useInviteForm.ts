import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";

const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  cell: z.string().optional()
});

export type InviteFormData = z.infer<typeof inviteSchema>;

interface UseInviteFormProps {
  onInviteCreated: (invite: any) => void;
  onClose: () => void;
}

export const useInviteForm = ({ onInviteCreated, onClose }: UseInviteFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      cell: ""
    }
  });

  const handleEmailSending = async (invite: any, data: InviteFormData) => {
    try {
      const { error: functionError } = await supabase.functions.invoke('send-invite-email', {
        body: {
          to: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          token: invite.token,
        },
      });

      if (functionError) {
        await supabase
          .from("invites")
          .update({ status: "email_failed" })
          .eq("id", invite.id);

        throw functionError;
      }

      const { error: updateError } = await supabase
        .from("invites")
        .update({ 
          status: "sent",
          date_sent: new Date().toISOString()
        })
        .eq("id", invite.id);

      if (updateError) throw updateError;
      
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };

  const onSubmit = async (data: InviteFormData) => {
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to send invites.",
      });
      return;
    }

    try {
      const { data: invite, error: inviteError } = await supabase
        .from("invites")
        .insert([
          {
            user_id: user.id,
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            cell: data.cell,
            status: "sent",
          },
        ])
        .select()
        .single();

      if (inviteError) throw inviteError;

      const emailSent = await handleEmailSending(invite, data);
      
      if (!emailSent) {
        toast({
          variant: "destructive",
          title: "Warning",
          description: "Invite created but email could not be sent. Please try resending later.",
        });
      } else {
        toast({
          title: "Invite sent successfully",
          description: `An invitation has been sent to ${data.email}`,
        });
      }

      onInviteCreated(invite);
      form.reset();
      onClose();
    } catch (err) {
      console.error("Error creating invite:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create invite. Please try again.",
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};