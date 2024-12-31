import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Calendar, Users } from "lucide-react";
import { format } from "date-fns";

const RetailerDetail = () => {
  const { id } = useParams();

  const { data: retailer, isLoading: isLoadingRetailer, error: retailerError } = useQuery({
    queryKey: ['retailer', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('retailers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: campaigns, isLoading: isLoadingCampaigns, error: campaignsError } = useQuery({
    queryKey: ['retailer-campaigns', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          game_system:game_systems (
            name,
            logo_image_url
          )
        `)
        .eq('retailer_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const error = retailerError || campaignsError;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 pt-24 pb-12">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                There was an error loading the retailer details. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {isLoadingRetailer ? (
            <div className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : retailer ? (
            <div>
              {retailer.store_photo && (
                <img
                  src={retailer.store_photo}
                  alt={retailer.name}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl font-bold mb-4">{retailer.name}</h1>
              <p className="text-gray-600 mb-4">{retailer.description}</p>
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                <p className="text-gray-600">{retailer.address}</p>
                <p className="text-gray-600">{retailer.city}, {retailer.state} {retailer.zip}</p>
                {retailer.phone && <p className="text-gray-600">Phone: {retailer.phone}</p>}
                {retailer.email && <p className="text-gray-600">Email: {retailer.email}</p>}
                {retailer.website_url && (
                  <a 
                    href={retailer.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>

              <h2 className="text-2xl font-semibold mb-4">Games at this Location</h2>
              {isLoadingCampaigns ? (
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : campaigns && campaigns.length > 0 ? (
                <div className="grid gap-4">
                  {campaigns.map((campaign) => (
                    <Link 
                      key={campaign.id}
                      to={`/campaigns/${campaign.id}`}
                      className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        {campaign.game_system?.logo_image_url && (
                          <img 
                            src={campaign.game_system.logo_image_url}
                            alt={campaign.game_system.name}
                            className="w-12 h-12 object-contain"
                          />
                        )}
                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg">{campaign.title}</h3>
                          <p className="text-gray-600">{campaign.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {campaign.min_players}-{campaign.max_players} players
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Created {format(new Date(campaign.created_at), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">${campaign.price}</span>
                          <span className="text-sm text-gray-500">/session</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No games found at this location.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Retailer not found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RetailerDetail;