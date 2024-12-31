import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CampaignEdit = () => {
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
              <h1 className="text-3xl font-bold mb-6">Edit Campaign: {campaign.title}</h1>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      defaultValue={campaign.title}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      defaultValue={campaign.description}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Min Players</label>
                      <input
                        type="number"
                        defaultValue={campaign.min_players}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Max Players</label>
                      <input
                        type="number"
                        defaultValue={campaign.max_players}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price per Session</label>
                    <input
                      type="number"
                      defaultValue={campaign.price}
                      step="0.01"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold/90 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                </form>
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

export default CampaignEdit;