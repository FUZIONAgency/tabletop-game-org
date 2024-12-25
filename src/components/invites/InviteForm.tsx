import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  cell: z.string().optional()
});

type InviteFormData = z.infer<typeof inviteSchema>;

interface InviteFormProps {
  playerId: string;
  onInviteCreated: (invite: any) => void;
  onClose: () => void;
}

export const InviteForm = ({ playerId, onInviteCreated, onClose }: InviteFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      cell: ""
    }
  });

  const onSubmit = async (data: InviteFormData) => {
    try {
      // Create the invite
      const { data: invite, error: inviteError } = await supabase
        .from("invites")
        .insert([
          {
            player_id: playerId,
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            cell: data.cell,
            status: "unsent",
            type: "requested",
          },
        ])
        .select()
        .single();

      if (inviteError) throw inviteError;

      // Send the email
      const response = await fetch("/functions/v1/send-invite-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Update parent component
      onInviteCreated(invite);
      
      // Reset form and close dialog
      form.reset();
      onClose();
      
      toast({
        title: "Invite sent successfully",
        description: `An invitation has been sent to ${data.email}`,
      });
    } catch (err) {
      console.error("Error creating invite:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send invite. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cell"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cell Phone (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Cell Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Send Invite
        </Button>
      </form>
    </Form>
  );
};