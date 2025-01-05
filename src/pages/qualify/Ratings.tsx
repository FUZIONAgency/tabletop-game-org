import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import Section from "@/components/Section";
import { useAuth } from "@/contexts/auth";

const Ratings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: player } = useQuery({
    queryKey: ['player', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('auth_id', user?.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const { data: ratings } = useQuery({
    queryKey: ['player_ratings', player?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('player_ratings')
        .select('rating')
        .eq('player_id', player?.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!player?.id
  });

  // Calculate average rating
  const averageRating = ratings?.length 
    ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length 
    : 0;

  return (
    <PageLayout>
      <Section
        id="ratings"
        title="Player Ratings"
        subtitle="Your Rating Score"
      >
        {player ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-xl font-semibold">
              {player.alias}
            </div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 ${
                    star <= averageRating 
                      ? "fill-gold text-gold" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Based on {ratings?.length || 0} ratings
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-lg text-gray-600">
              Create a player profile to view your ratings
            </p>
            <Button 
              onClick={() => navigate('/my/profile')}
              className="bg-gold hover:bg-gold/90"
            >
              Create Profile
            </Button>
          </div>
        )}
      </Section>
    </PageLayout>
  );
};

export default Ratings;