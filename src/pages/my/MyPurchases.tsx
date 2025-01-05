import { useQuery } from "@tanstack/react-query";
import { DollarSign, Calendar } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth";
import { format } from "date-fns";
import { PlayerSession } from "@/types/session";

const MyPurchases = () => {
  const { user } = useAuth();

  const { data: purchases, isLoading } = useQuery({
    queryKey: ['my-purchases', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data: playerData, error: playerError } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', user.id)
        .single();

      if (playerError) throw playerError;

      const { data, error } = await supabase
        .from('player_sessions')
        .select(`
          id,
          payment_status,
          session:sessions (
            id,
            start_date,
            price,
            campaign:campaigns (
              id,
              title,
              game_system:game_systems (
                name
              )
            )
          )
        `)
        .eq('player_id', playerData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as PlayerSession[];
    },
    enabled: !!user?.id,
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-2 mb-8">
          <DollarSign className="w-6 h-6" />
          <h1 className="text-3xl font-bold">My Purchases</h1>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            {purchases?.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {purchase.session.campaign.title} - {purchase.session.campaign.game_system.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(purchase.session.start_date), 'PPP')}
                      </span>
                      <span className="flex items-center gap-1 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {purchase.session.price.toFixed(2)}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      purchase.payment_status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {purchase.payment_status.charAt(0).toUpperCase() + purchase.payment_status.slice(1)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {(!purchases || purchases.length === 0) && (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">
                    No purchases found. Join some game sessions to see them here!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MyPurchases;