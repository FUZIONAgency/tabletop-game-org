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
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (!playerData) {
        toast({
          title: "Error",
          description: "Player profile not found",
          variant: "destructive",
        });
        return;
      }

      const { error: leaveError } = await supabase
        .from("campaign_players")
        .delete()
        .eq("campaign_id", campaignId)
        .eq("player_id", playerData.id);

      if (leaveError) throw leaveError;

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