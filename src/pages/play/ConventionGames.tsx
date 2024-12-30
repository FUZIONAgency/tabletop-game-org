import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CampaignTable } from "@/components/campaigns/CampaignTable";
import { useConventionCampaigns } from "@/hooks/useConventionCampaigns";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ConventionGames = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: campaigns, isLoading, refetch } = useConventionCampaigns();

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
      // First check if there are any existing players
      const { data: existingPlayers } = await supabase
        .from("campaign_players")
        .select("*")
        .eq("campaign_id", campaignId);

      const roleType = existingPlayers && existingPlayers.length === 0 ? "owner" : "player";

      // Get the player record for the current user
      const { data: playerData, error: playerError } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (playerError) throw playerError;

      if (!playerData) {
        toast({
          title: "Player profile required",
          description: "Please create a player profile first",
          variant: "destructive",
        });
        return;
      }

      // Check if the user is already in the campaign
      const { data: existingPlayer } = await supabase
        .from("campaign_players")
        .select("*")
        .eq("campaign_id", campaignId)
        .eq("player_id", playerData.id)
        .maybeSingle();

      if (existingPlayer) {
        toast({
          title: "Already joined",
          description: "You are already a member of this campaign",
          variant: "destructive",
        });
        return;
      }

      // Join the campaign
      const { error: joinError } = await supabase
        .from("campaign_players")
        .insert({
          campaign_id: campaignId,
          player_id: playerData.id,
          role_type: roleType,
          status: "active",
        });

      if (joinError) throw joinError;

      toast({
        title: "Success!",
        description: `You have joined the campaign as ${roleType}`,
      });

      refetch();
    } catch (error) {
      console.error("Error joining campaign:", error);
      toast({
        title: "Error",
        description: "Failed to join campaign. Please try again.",
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Section
          id="convention-games"
          title="Convention Games"
          subtitle="Find games at conventions"
        >
          {user ? (
            <CampaignTable 
              campaigns={campaigns || []} 
              onJoinCampaign={handleJoinCampaign}
              onLeaveCampaign={handleLeaveCampaign}
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-center">
                Discover Convention Games
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                Join our network of tabletop gaming enthusiasts and start playing at gaming conventions.
              </p>
              <Button 
                className="bg-gold text-black hover:bg-yellow-500 transition-colors"
                size="lg"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </div>
          )}
        </Section>
      </main>
    </div>
  );
};

export default ConventionGames;