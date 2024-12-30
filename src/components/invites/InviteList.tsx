import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Mail, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "../ui/use-toast";
import { format } from "date-fns";
import { useAuth } from "@/contexts/auth";

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
  decision: string | null;
  user_id: string;
}

interface InviteListProps {
  invites: Invite[];
  onInviteUpdate: () => void;
  type: 'sent' | 'received';
}

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

export const InviteList = ({ invites, onInviteUpdate, type }: InviteListProps) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleResendInvite = async (invite: Invite) => {
    try {
      const { error: functionError } = await supabase.functions.invoke('send-invite-email', {
        body: {
          to: invite.email,
          firstName: invite.first_name,
          lastName: invite.last_name,
        },
      });

      if (functionError) throw functionError;

      const { error: updateError } = await supabase
        .from("invites")
        .update({ 
          status: "sent",
          date_sent: new Date().toISOString()
        })
        .eq("id", invite.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Invite has been resent successfully.",
      });

      onInviteUpdate();
    } catch (error) {
      console.error("Error resending invite:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to resend invite. Please try again.",
      });
    }
  };

  const handleCancelInvite = async (inviteId: string) => {
    try {
      const { error } = await supabase
        .from("invites")
        .delete()
        .eq("id", inviteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Invite has been cancelled successfully.",
      });

      onInviteUpdate();
    } catch (error) {
      console.error("Error cancelling invite:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to cancel invite. Please try again.",
      });
    }
  };

  const handleDecideInvite = async (invite: Invite, decision: 'Accepted' | 'Declined') => {
    try {
      // First update the invite with the decision
      const { error: inviteError } = await supabase
        .from("invites")
        .update({ 
          decision,
          date_decided: new Date().toISOString()
        })
        .eq("id", invite.id);

      if (inviteError) throw inviteError;

      // If accepted, create a player relationship
      if (decision === 'Accepted') {
        // Get the current user's player record
        const { data: playerData, error: playerError } = await supabase
          .from("players")
          .select("id")
          .eq("auth_id", user?.id)
          .single();

        if (playerError) throw playerError;

        // Create the player relationship
        const { error: relationshipError } = await supabase
          .from("player_relationships")
          .insert({
            upline_id: invite.user_id,
            downline_id: playerData.id,
            type: 'requested sponsor of',
            status: 'active'
          });

        if (relationshipError) throw relationshipError;
      }

      toast({
        title: "Success",
        description: `Invite has been ${decision.toLowerCase()} successfully.`,
      });

      onInviteUpdate();
    } catch (error) {
      console.error("Error handling invite decision:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${decision.toLowerCase()} invite. Please try again.`,
      });
    }
  };

  return (
    <div className="grid gap-4">
      {invites.map((invite) => (
        <Card key={invite.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-medium">
                {invite.first_name
                  ? `${invite.first_name} ${invite.last_name}`
                  : invite.email}
              </p>
              <p className="text-sm text-muted-foreground">{invite.email}</p>
              {invite.date_sent && (
                <p className="text-sm text-muted-foreground">
                  Sent: {format(new Date(invite.date_sent), "MMM d, yyyy 'at' h:mm a")}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`${getStatusColor(invite.status)} text-white`}
              >
                {invite.status}
              </Badge>
              {type === 'sent' && invite.status === "unsent" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResendInvite(invite)}
                    className="flex items-center gap-1"
                  >
                    <Mail className="h-4 w-4" />
                    Resend
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancelInvite(invite.id)}
                    className="flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </>
              )}
              {type === 'received' && !invite.decision && (
                <>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleDecideInvite(invite, 'Accepted')}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDecideInvite(invite, 'Declined')}
                  >
                    Decline
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
      {invites.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No invites yet. Start growing your network!
        </p>
      )}
    </div>
  );
};