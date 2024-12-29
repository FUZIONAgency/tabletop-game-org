import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Star, StarHalf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@/components/ui/skeleton";

const Ratings = () => {
  const { user } = useAuth();
  const [averageRating, setAverageRating] = useState<number>(0);

  // Fetch player ID for the current user
  const { data: playerData } = useQuery({
    queryKey: ['player', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch ratings for the current player
  const { data: ratings, isLoading: ratingsLoading } = useQuery({
    queryKey: ['ratings', playerData?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('player_ratings')
        .select(`
          rating,
          comment,
          rating_player: players!player_ratings_rating_player_id_fkey(alias)
        `)
        .eq('player_id', playerData.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!playerData?.id,
  });

  // Calculate average rating
  useEffect(() => {
    if (ratings && ratings.length > 0) {
      const avg = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      setAverageRating(avg);
    }
  }, [ratings]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-8 h-8 text-gold fill-gold" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i} className="w-8 h-8 text-gold fill-gold" />);
      } else {
        stars.push(<Star key={i} className="w-8 h-8 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Rating</CardTitle>
              <CardDescription>
                Average rating based on {ratings?.length || 0} reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="flex space-x-1 mb-2">
                  {ratingsLoading ? (
                    <Skeleton className="h-8 w-48" />
                  ) : (
                    renderStars(averageRating)
                  )}
                </div>
                <span className="text-2xl font-bold">
                  {averageRating.toFixed(1)} / 5.0
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Player Ratings</CardTitle>
              <CardDescription>
                See what other players have said about you
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ratingsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : ratings?.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No ratings yet
                </p>
              ) : (
                <div className="space-y-4">
                  {ratings?.map((rating, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex space-x-1 mb-2">
                              {renderStars(rating.rating)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Rated by {rating.rating_player.alias}
                            </p>
                            {rating.comment && (
                              <p className="text-sm">{rating.comment}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Ratings;