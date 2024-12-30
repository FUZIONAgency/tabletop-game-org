import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "../ui/use-toast";
import { Invite } from "@/types/invite";
import { InviteCard } from "./InviteCard";

interface InviteListProps {
  invites: Invite[];
  onInviteUpdate: () => void;
  type: 'sent' | 'received';
}

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
        .eq("id", inviteId)
        .eq("user_id", user?.id); // Add this line to ensure users can only delete their own invites

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
        <InviteCard
          key={invite.id}
          invite={invite}
          type={type}
          onResend={handleResendInvite}
          onCancel={handleCancelInvite}
          onDecide={handleDecideInvite}
        />
      ))}
      {invites.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No invites yet. Start growing your network!
        </p>
      )}
    </div>
  );
};