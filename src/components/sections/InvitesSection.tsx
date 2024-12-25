import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Mail, UserPlus } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

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
  const { user } = useAuth();

  useEffect(() => {
    const fetchInvites = async () => {
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user?.id)
        .single();

      if (playerData) {
        const { data: invitesData } = await supabase
          .from("invites")
          .select("*")
          .eq("player_id", playerData.id)
          .order("created_at", { ascending: false });

        if (invitesData) {
          setInvites(invitesData);
        }
      }
    };

    if (user) {
      fetchInvites();
    }
  }, [user]);

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

  return (
    <div className="space-y-8 mt-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Your Invites</h3>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          <UserPlus className="h-4 w-4" />
          New Invite
        </button>
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