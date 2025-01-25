import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { SessionList } from "@/components/campaigns/SessionList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignHeader } from "@/components/campaigns/CampaignHeader";
import { AdvertisingTab } from "@/components/campaigns/tabs/AdvertisingTab";
import { ResourcesTab } from "@/components/campaigns/tabs/ResourcesTab";
import { PhotosTab } from "@/components/campaigns/tabs/PhotosTab";
import { ParticipantsTab } from "@/components/campaigns/tabs/ParticipantsTab";

const CampaignDetail = () => {
  const { id } = useParams();
  const currentUrl = window.location.href;

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
            id,
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

  const { data: participants } = useQuery({
    queryKey: ['campaign-participants', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaign_players')
        .select(`
          player:players (
            alias,
            alias_image_url
          )
        `)
        .eq('campaign_id', id);

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: resources } = useQuery({
    queryKey: ['campaign-resources', id],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from('campaigns')
        .list(`${id}/resources`);

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: photos } = useQuery({
    queryKey: ['campaign-photos', id],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from('campaigns')
        .list(`${id}/photos`);

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: ads } = useQuery({
    queryKey: ['campaign-ads', id],
    queryFn: async () => {
      console.log('Fetching ads for campaign:', id);
      const { data, error } = await supabase.storage
        .from('campaigns')
        .list(`${id}/ads`);

      if (error) {
        console.error('Error fetching ads:', error);
        throw error;
      }
      
      console.log('Raw storage response:', data);
      return data;
    },
    enabled: !!id,
  });

  const getFileUrl = (path: string) => {
    const url = supabase.storage
      .from('campaigns')
      .getPublicUrl(`${id}/${path}`).data.publicUrl;
    console.log('Generated URL for path:', path);
    console.log('Full URL:', url);
    return url;
  };

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
              <CampaignHeader
                gameSystemLogo={campaign.game_system?.logo_image_url}
                gameSystemName={campaign.game_system?.name}
                title={campaign.title}
                currentUrl={currentUrl}
              />

              {campaign.retailer && (
                <div className="mb-6">
                  <Link 
                    to={`/retailers/${campaign.retailer.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {campaign.retailer.name}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {campaign.retailer.address}, {campaign.retailer.city}, {campaign.retailer.state} {campaign.retailer.zip}
                  </p>
                </div>
              )}

              <Tabs defaultValue="sessions" className="w-full">
                <TabsList>
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                  <TabsTrigger value="advertising">Advertising</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                </TabsList>

                <TabsContent value="sessions">
                  <SessionList campaignId={campaign.id} />
                </TabsContent>

                <TabsContent value="advertising">
                  <AdvertisingTab ads={ads} getFileUrl={getFileUrl} />
                </TabsContent>

                <TabsContent value="resources">
                  <ResourcesTab resources={resources} getFileUrl={getFileUrl} />
                </TabsContent>

                <TabsContent value="photos">
                  <PhotosTab photos={photos} getFileUrl={getFileUrl} />
                </TabsContent>

                <TabsContent value="participants">
                  <ParticipantsTab participants={participants} />
                </TabsContent>
              </Tabs>
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