import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";

interface Invite {
  id: string;
  email: string;
  status: string;
  first_name: string | null;
  last_name: string | null;
  date_sent: string | null;
  date_read: string | null;
  date_decided: string | null;
}

const InvitesSection = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchInvites = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        setError(null);

        const { data: playerData, error: playerError } = await supabase
          .from("players")
          .select("id")
          .eq("auth_id", user.id)
          .maybeSingle();

        if (playerError) {
          throw playerError;
        }

        if (!playerData) {
          setInvites([]);
          return;
        }

        const { data: invitesData, error: invitesError } = await supabase
          .from("invites")
          .select("*")
          .eq("player_id", playerData.id)
          .order("created_at", { ascending: false });

        if (invitesError) {
          throw invitesError;
        }

        setInvites(invitesData || []);
      } catch (err) {
        console.error("Error fetching invites:", err);
        setError("Failed to load invites. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvites();
  }, [user?.id]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      unsent: "bg-gray-500",
      sent: "bg-blue-500",
      read: "bg-yellow-500",
      clicked: "bg-purple-500",
      accepted: "bg-green-500",
      declined: "bg-red-500",
      canceled: "bg-gray-700",
    };
    return colors[status] || "bg-gray-500";
  };

  if (isLoading) {
    return (
      <div className="space-y-4 mt-16">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-16">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Your Invites</h3>
        </div>
      </div>
      <div className="grid gap-4">
        {invites.map((invite) => (
          <Card key={invite.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {invite.first_name
                    ? `${invite.first_name} ${invite.last_name}`
                    : invite.email}
                </p>
                <p className="text-sm text-muted-foreground">{invite.email}</p>
              </div>
              <Badge
                variant="secondary"
                className={`${getStatusColor(invite.status)} text-white`}
              >
                {invite.status}
              </Badge>
            </div>
          </Card>
        ))}
        {invites.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No invites yet. Start growing your network!
          </p>
        )}
      </div>
    </div>
  );
};

export default InvitesSection;