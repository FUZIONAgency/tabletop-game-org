import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RetailerCard } from "@/components/retailers/RetailerCard";
import { RetailerSearchControls } from "@/components/retailers/RetailerSearchControls";
import { calculateDistance } from "@/utils/distance";

export default function RetailerSearch() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [retailers, setRetailers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [miles, setMiles] = useState<number>(50);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [linkedRetailers, setLinkedRetailers] = useState<string[]>([]);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    // Fetch linked retailers
    const fetchLinkedRetailers = async () => {
      if (!user) return;

      try {
        const { data: playerData } = await supabase
          .from("players")
          .select("id")
          .eq("auth_id", user.id)
          .single();

        if (playerData) {
          const { data: linkedData } = await supabase
            .from("player_retailers")
            .select("retailer_id")
            .eq("player_id", playerData.id);

          setLinkedRetailers(linkedData?.map(link => link.retailer_id) || []);
        }
      } catch (error) {
        console.error("Error fetching linked retailers:", error);
      }
    };

    fetchLinkedRetailers();
  }, [user]);

  const handleSearch = async (query: string, rangeInMiles: number) => {
    try {
      let retailersQuery = supabase
        .from("retailers")
        .select("*")
        .order("name");

      if (query) {
        retailersQuery = retailersQuery.or(
          `name.ilike.%${query}%,city.ilike.%${query}%,state.ilike.%${query}%`
        );
      }

      const { data, error } = await retailersQuery;

      if (error) throw error;

      let filteredRetailers = data || [];

      if (userLocation && rangeInMiles > 0) {
        filteredRetailers = filteredRetailers.filter((retailer) => {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            retailer.lat,
            retailer.lng
          );
          return distance <= rangeInMiles;
        });
      }

      setRetailers(filteredRetailers);
    } catch (error) {
      console.error("Error fetching retailers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch retailers. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLink = async (retailerId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to link a retailer.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (!playerData) throw new Error("Player not found");

      const { error } = await supabase.from("player_retailers").insert({
        player_id: playerData.id,
        retailer_id: retailerId,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Retailer linked successfully",
      });

      // Update linked retailers list
      setLinkedRetailers([...linkedRetailers, retailerId]);

      // Navigate back to My Retailers page
      navigate("/my/retailers");
    } catch (error) {
      console.error("Error linking retailer:", error);
      toast({
        title: "Error",
        description: "Failed to link retailer. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Retailers</h1>
      
      <RetailerSearchControls
        searchQuery={searchQuery}
        miles={miles}
        onSearchChange={setSearchQuery}
        onMilesChange={setMiles}
        onSearch={() => handleSearch(searchQuery, miles)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {retailers.map((retailer) => {
          const distance = userLocation
            ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                retailer.lat,
                retailer.lng
              )
            : undefined;

          return (
            <RetailerCard
              key={retailer.id}
              retailer={retailer}
              distance={distance}
              onLink={handleLink}
              isLinked={linkedRetailers.includes(retailer.id)}
            />
          );
        })}
      </div>

      {retailers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No retailers found. Try adjusting your search criteria.
        </p>
      )}
    </div>
  );
}