import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePlayerData } from "@/components/network/hooks/usePlayerData";

export const useCampaignActions = (refetch: () => void) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const playerId = usePlayerData(user?.id);

  const handleJoinCampaign = async (campaignId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join campaigns",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!playerId) {
        toast({
          title: "Player profile required", 
          description: "Please create a player profile first",
          variant: "destructive",
        });
        return;
      }

      // Check if already a member
      const { data: existingMember } = await supabase
        .from("campaign_players")
        .select()
        .eq("campaign_id", campaignId)
        .eq("player_id", playerId)
        .maybeSingle();

      if (existingMember) {
        toast({
          title: "Already a member",
          description: "You are already a member of this campaign",
          variant: "destructive",
        });
        return;
      }

      // Join as player
      const { error: joinError } = await supabase
        .from("campaign_players")
        .insert({
          campaign_id: campaignId,
          player_id: playerId,
          role_type: "player",
          status: "active"
        });

      if (joinError) throw joinError;

      toast({
        title: "Success",
        description: "You have joined the campaign",
      });

      refetch();

    } catch (error) {
      console.error("Error joining campaign:", error);
      toast({
        title: "Error",
        description: "Failed to join campaign",
        variant: "destructive",
      });
    }
  };

  const handleLeaveCampaign = async (campaignId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to leave campaigns",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!playerId) {
        toast({
          title: "Error",
          description: "Player profile not found",
          variant: "destructive",
        });
        return;
      }

      // Check if owner
      const { data: ownerCheck } = await supabase
        .from("campaign_players")
        .select()
        .eq("campaign_id", campaignId)
        .eq("player_id", playerId)
        .eq("role_type", "owner")
        .maybeSingle();

      if (ownerCheck) {
        toast({
          title: "Cannot leave",
          description: "Campaign owners cannot leave their campaigns",
          variant: "destructive",
        });
        return;
      }

      const { error: leaveError } = await supabase
        .from("campaign_players")
        .delete()
        .eq("campaign_id", campaignId)
        .eq("player_id", playerId);

      if (leaveError) throw leaveError;

      toast({
        title: "Success",
        description: "You have left the campaign",
      });

      refetch();

    } catch (error) {
      console.error("Error leaving campaign:", error);
      toast({
        title: "Error",
        description: "Failed to leave campaign",
        variant: "destructive",
      });
    }
  };

  return {
    handleJoinCampaign,
    handleLeaveCampaign
  };
};