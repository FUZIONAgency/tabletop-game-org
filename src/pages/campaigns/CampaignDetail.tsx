import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { SessionList } from "@/components/campaigns/SessionList";

const CampaignDetail = () => {
  const { id } = useParams();

  const { data: campaign, isLoading, error } = useQuery({
    queryKey: ['campaign', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          game_system:game_systems (
            name,
            logo_image_url
          ),
          retailer:retailers (
            name,
            address,
            city,
            state,
            zip
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: confirmedPlayersCount } = useQuery({
    queryKey: ['campaign-players-count', id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('campaign_players')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_id', id)
        .eq('status', 'active');

      if (error) throw error;
      return count || 0;
    },
    enabled: !!id,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 pt-24 pb-12">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                There was an error loading the campaign details. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : campaign ? (
            <div>
              <div className="flex items-center gap-6 mb-6">
                {campaign.game_system?.logo_image_url && (
                  <img
                    src={campaign.game_system.logo_image_url}
                    alt={campaign.game_system.name}
                    className="w-24 h-24 object-contain"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold">{campaign.title}</h1>
                  <p className="text-gray-600">{campaign.game_system?.name}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-5 h-5" />
                      {confirmedPlayersCount} / {campaign.max_players} players
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-5 h-5" />
                      Created {format(new Date(campaign.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold">${campaign.price}</span>
                    <span className="text-gray-500">/session</span>
                  </div>
                </div>
                <p className="text-gray-700">{campaign.description}</p>
              </div>

              {campaign.retailer && (
                <div className="border rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <p className="font-medium text-lg">{campaign.retailer.name}</p>
                  <p className="text-gray-600">{campaign.retailer.address}</p>
                  <p className="text-gray-600">
                    {campaign.retailer.city}, {campaign.retailer.state} {campaign.retailer.zip}
                  </p>
                </div>
              )}

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Sessions</h2>
                <SessionList campaignId={campaign.id} />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Campaign not found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CampaignDetail;