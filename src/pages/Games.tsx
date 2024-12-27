import { useAuth } from "@/contexts/auth";
import { CampaignTable } from "@/components/campaigns/CampaignTable";
import { useCampaigns } from "@/hooks/useCampaigns";
import Section from "@/components/Section";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";

const Games = () => {
  const { user } = useAuth();
  const { data: campaigns, isLoading } = useCampaigns();

  const handleJoinCampaign = async (campaignId: string) => {
    const { error } = await supabase
      .from("campaign_players")
      .insert([{ 
        player_id: user?.id, 
        campaign_id: campaignId,
        role_type: 'player' // Adding the required role_type field
      }]);

    if (error) {
      console.error("Error joining campaign:", error);
    }
  };

  const handleLeaveCampaign = async (campaignId: string) => {
    const { error } = await supabase
      .from("campaign_players")
      .delete()
      .eq("player_id", user?.id)
      .eq("campaign_id", campaignId);

    if (error) {
      console.error("Error leaving campaign:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <Section
            id="games"
            title="My Games"
            subtitle="Please login to view your games"
          >
            <p>You need to be logged in to view and manage your games.</p>
          </Section>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <Section
            id="games"
            title="My Games"
            subtitle="View and manage your games"
          >
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </Section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Section
          id="games"
          title="My Games"
          subtitle="View and manage your games"
        >
          <CampaignTable 
            campaigns={campaigns || []} 
            onJoinCampaign={handleJoinCampaign}
            onLeaveCampaign={handleLeaveCampaign}
          />
        </Section>
      </main>
    </div>
  );
};

export default Games;