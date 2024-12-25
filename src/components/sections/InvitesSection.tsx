import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Mail, UserPlus } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  cell: z.string().optional()
});

type InviteFormData = z.infer<typeof inviteSchema>;

interface Invite {
  id: string;
  email: string;
  status: string;
  first_name: string | null;
  last_name: string | null;
  cell: string | null;
  date_sent: string | null;
  date_read: string | null;
  date_decided: string | null;
}

const InvitesSection = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
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

  useEffect(() => {
    const fetchInvites = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        setError(null);

        const { data: playerData, error: playerError } = await supabase
          .from("players")
          .select("id")
          .eq("auth_id", user.id)
          .maybeSingle();

        if (playerError) {
          throw playerError;
        }

        if (!playerData) {
          setInvites([]);
          return;
        }

        const { data: invitesData, error: invitesError } = await supabase
          .from("invites")
          .select("*")
          .eq("player_id", playerData.id)
          .order("created_at", { ascending: false });

        if (invitesError) {
          throw invitesError;
        }

        setInvites(invitesData || []);
      } catch (err) {
        console.error("Error fetching invites:", err);
        setError("Failed to load invites. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvites();
  }, [user?.id]);

  const onSubmit = async (data: InviteFormData) => {
    if (!user?.id) return;

    try {
      // Get the player_id first
      const { data: playerData, error: playerError } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (playerError) throw playerError;
      if (!playerData) throw new Error("Player not found");

      // Create the invite
      const { data: invite, error: inviteError } = await supabase
        .from("invites")
        .insert([
          {
            player_id: playerData.id,
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

      // Update the local state
      setInvites((prev) => [invite, ...prev]);
      
      // Reset form and close dialog
      form.reset();
      setIsOpen(false);
      
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      unsent: "bg-gray-500",
      sent: "bg-blue-500",
      read: "bg-yellow-500",
      clicked: "bg-purple-500",
      accepted: "bg-green-500",
      declined: "bg-red-500",
      canceled: "bg-gray-700",
    };
    return colors[status] || "bg-gray-500";
  };

  if (isLoading) {
    return (
      <div className="space-y-4 mt-16">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Your Invites</h3>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              New Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send New Invite</DialogTitle>
            </DialogHeader>
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
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {invites.map((invite) => (
          <Card key={invite.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {invite.first_name
                    ? `${invite.first_name} ${invite.last_name}`
                    : invite.email}
                </p>
                <p className="text-sm text-muted-foreground">{invite.email}</p>
              </div>
              <Badge
                variant="secondary"
                className={`${getStatusColor(invite.status)} text-white`}
              >
                {invite.status}
              </Badge>
            </div>
          </Card>
        ))}
        {invites.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No invites yet. Start growing your network!
          </p>
        )}
      </div>
    </div>
  );
};

export default InvitesSection;