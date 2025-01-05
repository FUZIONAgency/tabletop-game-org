import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Retailer, RetailerResponse } from "@/types/retailer";

const MyRetailers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: retailers, isLoading, error } = useQuery({
    queryKey: ['my-retailers', user?.id],
    queryFn: async () => {
      const { data: playerData, error: playerError } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', user?.id)
        .maybeSingle();

      if (playerError) throw playerError;
      if (!playerData) return [];

      const { data, error: retailersError } = await supabase
        .from('player_retailers')
        .select(`
          retailer:retailers (
            id,
            name,
            description,
            address,
            city,
            state,
            store_photo
          )
        `)
        .eq('player_id', playerData.id);

      if (retailersError) throw retailersError;
      
      // Transform the data to match RetailerResponse type
      return (data || []).map(item => ({
        retailer: item.retailer as Retailer
      })) as RetailerResponse[];
    },
    enabled: !!user,
  });

  const handleRetailerClick = (retailerId: string) => {
    navigate(`/retailers/${retailerId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Retailers</h1>
            <Button 
              onClick={() => navigate('/retailers/search')} 
              className="bg-gold hover:bg-yellow-500 text-black"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Retailers
            </Button>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                There was an error loading your retailers. Please try again later.
              </AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : retailers?.length === 0 ? (
            <p className="text-gray-500">You haven't connected with any retailers yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {retailers?.map(({ retailer }) => (
                <div 
                  key={retailer.id} 
                  className="border rounded-lg overflow-hidden shadow-sm cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => handleRetailerClick(retailer.id)}
                >
                  {retailer.store_photo && (
                    <img 
                      src={retailer.store_photo} 
                      alt={retailer.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{retailer.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{retailer.description}</p>
                    <p className="text-sm text-gray-500">
                      {retailer.address}, {retailer.city}, {retailer.state}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} TabletopGame.org. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MyRetailers;