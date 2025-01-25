import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { RetailerCard } from "@/components/retailers/RetailerCard";
import { RetailerSearchControls } from "@/components/retailers/RetailerSearchControls";
import { calculateDistance } from "@/utils/distance";

const RetailerSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [rangeInMiles, setRangeInMiles] = useState("50");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Access Required",
            description: "Please enable location access to see nearby retailers",
            variant: "destructive",
          });
        }
      );
    }
  }, [toast]);

  // Fetch user's linked retailers
  const { data: linkedRetailers = [] } = useQuery({
    queryKey: ['linked-retailers', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data: playerData } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', user.id)
        .single();

      if (!playerData) return [];

      const { data: links } = await supabase
        .from('player_retailers')
        .select('retailer_id')
        .eq('player_id', playerData.id)
        .eq('status', 'active');

      return (links || []).map(link => link.retailer_id);
    },
    enabled: !!user
  });

  const { data: retailers = [], isLoading } = useQuery({
    queryKey: ['retailers', searchQuery, userLocation, rangeInMiles],
    queryFn: async () => {
      let query = supabase
        .from('retailers')
        .select('*')
        .eq('status', 'active');

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,state.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching retailers:', error);
        throw error;
      }

      // Filter retailers by distance if user location is available and range is valid
      if (userLocation && data && Number(rangeInMiles) > 0) {
        return data.filter(retailer => {
          if (!retailer.lat || !retailer.lng) return false;
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            retailer.lat,
            retailer.lng
          );
          return distance <= Number(rangeInMiles);
        });
      }

      return data || [];
    },
    enabled: true,
  });

  const handleLinkRetailer = async (retailerId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to link retailers",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: playerData, error: playerError } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', user.id)
        .maybeSingle();

      if (playerError) throw playerError;
      if (!playerData) {
        toast({
          title: "Profile Required",
          description: "Please create your player profile first",
          variant: "destructive",
        });
        return;
      }

      const { data: existingLink } = await supabase
        .from('player_retailers')
        .select('*')
        .eq('player_id', playerData.id)
        .eq('retailer_id', retailerId)
        .maybeSingle();

      if (existingLink) {
        toast({
          title: "Already Linked",
          description: "This retailer is already linked to your account",
          variant: "destructive",
        });
        return;
      }

      const { error: linkError } = await supabase
        .from('player_retailers')
        .insert({
          player_id: playerData.id,
          retailer_id: retailerId,
          status: 'active'
        });

      if (linkError) throw linkError;

      toast({
        title: "Success",
        description: "Retailer linked successfully",
      });

      navigate('/my/retailers');
    } catch (error) {
      console.error('Error linking retailer:', error);
      toast({
        title: "Error",
        description: "Failed to link retailer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRangeUpdate = () => {
    const range = Number(rangeInMiles);
    if (isNaN(range) || range < 0) {
      toast({
        title: "Invalid Range",
        description: "Please enter a valid number of miles",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">Search Retailers</h1>
          
          <RetailerSearchControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            rangeInMiles={rangeInMiles}
            onRangeChange={setRangeInMiles}
            onRangeUpdate={handleRangeUpdate}
          />

          {isLoading ? (
            <div className="text-center">Loading retailers...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {retailers?.map((retailer) => (
                <RetailerCard
                  key={retailer.id}
                  retailer={retailer}
                  distance={
                    userLocation && retailer.lat && retailer.lng
                      ? calculateDistance(
                          userLocation.lat,
                          userLocation.lng,
                          retailer.lat,
                          retailer.lng
                        )
                      : undefined
                  }
                  onLink={handleLinkRetailer}
                  isLinked={linkedRetailers.includes(retailer.id)}
                />
              ))}
            </div>
          )}

          {retailers?.length === 0 && !isLoading && (
            <p className="text-center text-gray-500">No retailers found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RetailerSearch;