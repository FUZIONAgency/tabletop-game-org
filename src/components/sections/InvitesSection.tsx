import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Mail, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { InviteForm } from "../invites/InviteForm";
import { InviteList } from "../invites/InviteList";
import { Invite } from "@/types/invite";

const InvitesSection = () => {
  const [sentInvites, setSentInvites] = useState<Invite[]>([]);
  const [receivedInvites, setReceivedInvites] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const fetchInvites = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      // Fetch sent invites
      const { data: sentData, error: sentError } = await supabase
        .from("invites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (sentError) throw sentError;

      // Fetch received invites
      const { data: receivedData, error: receivedError } = await supabase
        .from("invites")
        .select("*")
        .eq("email", user.email)
        .order("created_at", { ascending: false });

      if (receivedError) throw receivedError;

      setSentInvites(sentData || []);
      setReceivedInvites(receivedData || []);
    } catch (err) {
      console.error("Error fetching invites:", err);
      setError("Failed to load invites. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, [user?.id, user?.email]);

  const handleInviteCreated = (newInvite: Invite) => {
    setSentInvites((prev) => [newInvite, ...prev]);
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
    <div className="space-y-12 mt-16">
      {/* Sent Invites Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Invitations You've Sent</h3>
          </div>
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
                onInviteCreated={handleInviteCreated}
                onClose={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <InviteList invites={sentInvites} onInviteUpdate={fetchInvites} type="sent" />
      </div>

      {/* Received Invites Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Invitations You've Received</h3>
        </div>
        <InviteList invites={receivedInvites} onInviteUpdate={fetchInvites} type="received" />
      </div>
    </div>
  );
};

export default InvitesSection;