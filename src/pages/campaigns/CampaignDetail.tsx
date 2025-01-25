import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Calendar, FileIcon, ImageIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { SessionList } from "@/components/campaigns/SessionList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      const { data, error } = await supabase.storage
        .from('campaigns')
        .list(`${id}/ads`);

      console.log('Ads folder contents:', data);

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const getFileUrl = (path: string) => {
    const url = supabase.storage
      .from('campaigns')
      .getPublicUrl(`${id}/${path}`).data.publicUrl;
    console.log('Generated URL:', url);
    return url;
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <ImageIcon className="h-6 w-6" />;
    }
    return <FileIcon className="h-6 w-6" />;
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ads?.map((ad) => (
                      <img
                        key={ad.name}
                        src={getFileUrl(`ads/${ad.name}`)}
                        alt={ad.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="resources">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {resources?.map((resource) => (
                      <a
                        key={resource.name}
                        href={getFileUrl(`resources/${resource.name}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        {getFileIcon(resource.metadata?.mimetype || '')}
                        <span className="truncate">{resource.name}</span>
                      </a>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="photos">
                  <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {photos?.map((photo) => (
                        <img
                          key={photo.name}
                          src={getFileUrl(`photos/${photo.name}`)}
                          alt={photo.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="participants">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {participants?.map((participant) => (
                      <div key={participant.player.alias} className="flex items-center gap-2 p-4 border rounded-lg">
                        {participant.player.alias_image_url && (
                          <img
                            src={participant.player.alias_image_url}
                            alt={participant.player.alias}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <span>{participant.player.alias}</span>
                      </div>
                    ))}
                  </div>
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