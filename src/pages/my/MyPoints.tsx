import { useQuery } from "@tanstack/react-query";
import { Star, Users, Trophy, Gamepad2, Store, Tent, MapPin, UserCheck } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth";

interface PointsMetrics {
  total_game_sessions: number;
  total_retailers: number;
  total_tournaments: number;
  total_online_games: number;
  total_retailer_games: number;
  total_convention_games: number;
}

const MyPoints = () => {
  const { user } = useAuth();

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['points-metrics', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase.rpc(
        'get_player_earnings_metrics',
        { auth_uid: user.id }
      );

      if (error) throw error;
      return (data?.[0] || {}) as PointsMetrics;
    },
    enabled: !!user?.id,
  });

  // Query for visit statistics
  const { data: visitStats, isLoading: visitsLoading } = useQuery({
    queryKey: ['visit-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      // Get total visits count
      const { count: totalVisits, error: visitsError } = await supabase
        .from('visits')
        .select('*', { count: 'exact', head: true })
        .eq('auth_id', user.id);

      if (visitsError) throw visitsError;

      // Get total customer demos
      const { data: demoData, error: demoError } = await supabase
        .from('visits')
        .select('customer_demo_count')
        .eq('auth_id', user.id);

      if (demoError) throw demoError;

      const totalDemos = demoData?.reduce((sum, visit) => sum + (visit.customer_demo_count || 0), 0) || 0;

      return {
        totalVisits: totalVisits || 0,
        totalDemos
      };
    },
    enabled: !!user?.id,
  });

  const isLoading = metricsLoading || visitsLoading;

  const stats = [
    {
      title: "Total Visits",
      value: visitStats?.totalVisits || 0,
      icon: MapPin,
      description: "Retailer visits recorded"
    },
    {
      title: "Customer Demos",
      value: visitStats?.totalDemos || 0,
      icon: UserCheck,
      description: "Product demonstrations given"
    },
    {
      title: "Total Game Sessions",
      value: metrics?.total_game_sessions || 0,
      icon: Gamepad2,
      description: "All gaming sessions attended"
    },
    {
      title: "Retailer Connections",
      value: metrics?.total_retailers || 0,
      icon: Store,
      description: "Active retailer partnerships"
    },
    {
      title: "Tournament Entries",
      value: metrics?.total_tournaments || 0,
      icon: Trophy,
      description: "Tournaments participated in"
    },
    {
      title: "Online Games",
      value: metrics?.total_online_games || 0,
      icon: Users,
      description: "Virtual gaming sessions"
    },
    {
      title: "Retailer Games",
      value: metrics?.total_retailer_games || 0,
      icon: Store,
      description: "In-store gaming sessions"
    },
    {
      title: "Convention Games",
      value: metrics?.total_convention_games || 0,
      icon: Tent,
      description: "Convention gaming events"
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-2 mb-8">
          <Star className="w-6 h-6" />
          <h1 className="text-3xl font-bold">My Points</h1>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default MyPoints;