import { MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePlayerForm } from "@/components/forms/CreatePlayerForm";

interface PlayerData {
  id: string;
  alias: string;
  email: string;
  city: string | null;
  state: string | null;
  alias_image_url: string | null;
}

interface PlayerCardProps {
  player: PlayerData | null;
  userEmail: string;
  onSuccess: () => void;
}

export const PlayerCard = ({ player, userEmail, onSuccess }: PlayerCardProps) => {
  if (!player) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">No Player Profile Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Your email is not associated with any player profile.
          </p>
          {userEmail && <CreatePlayerForm email={userEmail} onSuccess={onSuccess} />}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Player Profile: {player.alias}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {player.city && player.state && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {player.city}, {player.state}
            </span>
          </div>
        )}
        {player.alias_image_url && (
          <img
            src={player.alias_image_url}
            alt={player.alias}
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        )}
      </CardContent>
    </Card>
  );
};