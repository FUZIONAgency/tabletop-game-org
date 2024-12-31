import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";
import { CampaignTable } from "@/components/campaigns/CampaignTable";
import { useRetailerCampaigns } from "@/hooks/useRetailerCampaigns";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { UnauthenticatedCampaignView } from "@/components/campaigns/UnauthenticatedCampaignView";
import { CampaignManagementButtons } from "@/components/campaigns/CampaignManagementButtons";
import { useCampaignActions } from "@/hooks/useCampaignActions";

const RetailerGames = () => {
  const { user } = useAuth();
  const { data: campaigns, isLoading, error, refetch } = useRetailerCampaigns();
  const {
    handleJoinCampaign,
    handleLeaveCampaign
  } = useCampaignActions(() => {
    // Refetch after actions
    refetch();
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <Section
            id="retailer-games"
            title="Error"
            subtitle="There was an error loading the games"
          >
            <p className="text-red-500">
              {error instanceof Error ? error.message : "An unknown error occurred"}
            </p>
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
          id="retailer-games"
          title="Retailer Games"
          subtitle="Play at your local game store"
        >
          {user ? (
            <>
              <CampaignManagementButtons />
              <CampaignTable 
                campaigns={campaigns || []} 
                onJoinCampaign={handleJoinCampaign}
                onLeaveCampaign={handleLeaveCampaign}
              />
            </>
          ) : (
            <UnauthenticatedCampaignView />
          )}
        </Section>
      </main>
    </div>
  );
};

export default RetailerGames;