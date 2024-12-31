import { useState } from "react";
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: retailers, isLoading } = useQuery({
    queryKey: ['retailers', searchQuery],
    queryFn: async () => {
      const query = supabase
        .from('retailers')
        .select('*')
        .eq('status', 'active');

      if (searchQuery) {
        query.or(`name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,state.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">Search Retailers</h1>
          
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search by name, city, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xl"
            />
            <Button className="bg-gold hover:bg-yellow-500 text-black">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
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