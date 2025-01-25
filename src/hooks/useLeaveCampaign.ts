import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useLeaveCampaign = (refetch: () => void) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const leaveCampaign = async (campaignId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to leave campaigns",
        variant: "destructive",
      });
      return;
    }

    try {
      // First get the player record for the current user
      const { data: playerData, error: playerError } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (playerError) throw playerError;

      if (!playerData) {
        toast({
          title: "Error",
          description: "Player profile not found",
          variant: "destructive",
        });
        return;
      }

      console.log("Attempting to delete campaign_players record:", {
        campaignId,
        playerId: playerData.id
      });

      // Delete the campaign_players record
      const { error: leaveError } = await supabase
        .from("campaign_players")
        .delete()
        .eq("campaign_id", campaignId)
        .eq("player_id", playerData.id);

      if (leaveError) {
        console.error("Error deleting campaign_players record:", leaveError);
        throw leaveError;
      }

      toast({
        title: "Success!",
        description: "You have left the campaign",
      });

      refetch();
    } catch (error) {
      console.error("Error leaving campaign:", error);
      toast({
        title: "Error",
        description: "Failed to leave campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  return leaveCampaign;
};