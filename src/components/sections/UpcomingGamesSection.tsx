import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { usePlayerSessions } from "@/hooks/usePlayerSessions";
import { SessionCard } from "./games/SessionCard";

export const UpcomingGamesSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: hostedSessions } = usePlayerSessions(user?.id, "owner");
  const { data: playerSessions } = usePlayerSessions(user?.id, "player");

  const handleViewSession = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const handleViewRetailer = (retailerId: string) => {
    navigate(`/retailers/${retailerId}`);
  };

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Games you are hosting</h2>
        <div className="grid gap-4">
          {hostedSessions?.length ? (
            hostedSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onViewSession={handleViewSession}
                onViewRetailer={handleViewRetailer}
              />
            ))
          ) : (
            <p className="text-gray-500">No upcoming games you're hosting.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Games you are playing</h2>
        <div className="grid gap-4">
          {playerSessions?.length ? (
            playerSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onViewSession={handleViewSession}
                onViewRetailer={handleViewRetailer}
              />
            ))
          ) : (
            <p className="text-gray-500">No upcoming games you're playing in.</p>
          )}
        </div>
      </div>
    </div>
  );
};