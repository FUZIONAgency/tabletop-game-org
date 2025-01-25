import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { usePlayerData } from "@/components/network/hooks/usePlayerData";
import PageLayout from "@/components/PageLayout";
import { CampaignTable } from "@/components/campaigns/CampaignTable";

const MyGames = () => {
  const { user } = useAuth();
  const playerId = usePlayerData(user?.id);

  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ['my-campaigns', playerId],
    queryFn: async () => {
      if (!playerId) return [];

      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          game_system:game_systems (
            id,
            name,
            logo_image_url
          ),
          campaign_players!inner (
            player_id,
            role_type
          )
        `)
        .eq('campaign_players.player_id', playerId);

      if (error) throw error;
      
      return data?.map(campaign => ({
        ...campaign,
        is_owner: campaign.campaign_players[0].role_type === 'owner',
        is_member: true
      })) || [];
    },
    enabled: !!playerId,
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">My Games</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There was an error loading your games. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <CampaignTable campaigns={campaigns || []} />
        )}
      </div>
    </PageLayout>
  );
};

export default MyGames;