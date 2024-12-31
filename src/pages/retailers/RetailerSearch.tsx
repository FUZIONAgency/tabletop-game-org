import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";

const RetailerSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [rangeInMiles, setRangeInMiles] = useState("50");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Get user's location when component mounts
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

  const { data: retailers, isLoading } = useQuery({
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
      
      if (error) throw error;

      // Filter retailers by distance if user location is available
      if (userLocation && data) {
        const filteredData = data.filter(retailer => {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            retailer.lat,
            retailer.lng
          );
          return distance <= Number(rangeInMiles);
        });
        return filteredData;
      }

      return data || [];
    },
    enabled: true,
  });

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Earth's radius in miles
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value: number) => {
    return (value * Math.PI) / 180;
  };

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
      // Get the player ID for the current user
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

      // Check if the retailer is already linked
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

      // Create the link
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

      // Navigate back to My Retailers page
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
    // Validate range input
    const range = Number(rangeInMiles);
    if (isNaN(range) || range <= 0) {
      toast({
        title: "Invalid Range",
        description: "Please enter a valid number of miles",
        variant: "destructive",
      });
      return;
    }
    // The query will automatically re-run due to the queryKey including rangeInMiles
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">Search Retailers</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name, city, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Range in miles..."
                value={rangeInMiles}
                onChange={(e) => setRangeInMiles(e.target.value)}
                className="w-32"
              />
              <Button 
                onClick={handleRangeUpdate}
                className="bg-gold hover:bg-yellow-500 text-black whitespace-nowrap"
              >
                Range in Miles
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {retailers?.map((retailer) => (
              <Card key={retailer.id}>
                {retailer.store_photo && (
                  <img
                    src={retailer.store_photo}
                    alt={retailer.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle>{retailer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{retailer.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {retailer.address}, {retailer.city}, {retailer.state}
                  </p>
                  {userLocation && (
                    <p className="text-sm text-gray-500 mb-4">
                      Distance: {calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        retailer.lat,
                        retailer.lng
                      ).toFixed(1)} miles
                    </p>
                  )}
                  <Button
                    onClick={() => handleLinkRetailer(retailer.id)}
                    className="w-full bg-gold hover:bg-yellow-500 text-black"
                  >
                    Link Retailer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {retailers?.length === 0 && !isLoading && (
            <p className="text-center text-gray-500">No retailers found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RetailerSearch;