import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { InviteCard } from "./InviteCard";
import { Invite } from "@/types/invite";
import { InviteDecisionButtons } from "./InviteDecisionButtons";

interface InviteListProps {
  invites: Invite[];
  onInviteUpdate: () => void;
  type: 'sent' | 'received';
}

export const InviteList = ({ invites, onInviteUpdate, type }: InviteListProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);

  // Fetch current player's ID
  useQuery({
    queryKey: ['current-player', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (error) throw error;
      setCurrentPlayerId(data.id);
      return data;
    },
    enabled: !!user,
  });

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
        .eq("user_id", user?.id);

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

  return (
    <div className="grid gap-4">
      {invites.map((invite) => (
        <InviteCard
          key={invite.id}
          invite={invite}
          type={type}
          onResend={handleResendInvite}
          onCancel={handleCancelInvite}
          decisionButtons={
            type === 'received' && currentPlayerId ? (
              <InviteDecisionButtons
                invite={invite}
                currentPlayerId={currentPlayerId}
                onSuccess={onInviteUpdate}
              />
            ) : null
          }
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