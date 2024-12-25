import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Mail, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { InviteForm } from "../invites/InviteForm";
import { InviteList } from "../invites/InviteList";

interface Invite {
  id: string;
  email: string;
  status: string;
  first_name: string | null;
  last_name: string | null;
  cell: string | null;
  date_sent: string | null;
  date_read: string | null;
  date_decided: string | null;
}

const InvitesSection = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [playerId, setPlayerId] = useState<string | null>(null);
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

        setPlayerId(playerData.id);

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

  const handleInviteCreated = (newInvite: Invite) => {
    setInvites((prev) => [newInvite, ...prev]);
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Your Invites</h3>
        </div>
        {playerId && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                New Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send New Invite</DialogTitle>
              </DialogHeader>
              <InviteForm
                playerId={playerId}
                onInviteCreated={handleInviteCreated}
                onClose={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <InviteList invites={invites} />
    </div>
  );
};

export default InvitesSection;