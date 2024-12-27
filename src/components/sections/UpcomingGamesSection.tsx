import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Session {
  id: string;
  session_number: number;
  start_date: string;
  description: string;
  campaign: {
    id: string;
    title: string;
  };
}

export const UpcomingGamesSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: hostedSessions } = useQuery({
    queryKey: ["hosted-sessions"],
    queryFn: async () => {
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user?.id)
        .maybeSingle();

      if (!playerData) return [];

      const { data, error } = await supabase
        .from("sessions")
        .select(`
          id,
          session_number,
          start_date,
          description,
          campaign:campaigns (
            id,
            title
          )
        `)
        .gte("start_date", new Date().toISOString())
        .in("campaign_id", (
          supabase
            .from("campaign_players")
            .select("campaign_id")
            .eq("player_id", playerData.id)
            .eq("role_type", "owner")
        ))
        .order("start_date", { ascending: true })
        .limit(4);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: playerSessions } = useQuery({
    queryKey: ["player-sessions"],
    queryFn: async () => {
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user?.id)
        .maybeSingle();

      if (!playerData) return [];

      const { data, error } = await supabase
        .from("sessions")
        .select(`
          id,
          session_number,
          start_date,
          description,
          campaign:campaigns (
            id,
            title
          )
        `)
        .gte("start_date", new Date().toISOString())
        .in("campaign_id", (
          supabase
            .from("campaign_players")
            .select("campaign_id")
            .eq("player_id", playerData.id)
            .neq("role_type", "owner")
        ))
        .order("start_date", { ascending: true })
        .limit(4);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleViewSession = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const renderSessionCard = (session: Session) => (
    <Card key={session.id} className="p-4 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{session.campaign.title}</h4>
          <p className="text-sm text-gray-500">Session {session.session_number}</p>
          <p className="text-sm text-gray-500">
            {new Date(session.start_date).toLocaleDateString()}
          </p>
          {session.description && (
            <p className="text-sm text-gray-600 mt-2">{session.description}</p>
          )}
        </div>
        <Button
          onClick={() => handleViewSession(session.campaign.id)}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      </div>
    </Card>
  );

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Games you are hosting</h2>
        <div className="grid gap-4">
          {hostedSessions?.length ? (
            hostedSessions.map(renderSessionCard)
          ) : (
            <p className="text-gray-500">No upcoming games you're hosting.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Games you are playing</h2>
        <div className="grid gap-4">
          {playerSessions?.length ? (
            playerSessions.map(renderSessionCard)
          ) : (
            <p className="text-gray-500">No upcoming games you're playing in.</p>
          )}
        </div>
      </div>
    </div>
  );
};