import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { SessionForm } from "./SessionForm";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  campaign_id: string;
  session_number: number;
  start_date: string;
  end_date: string | null;
  description: string | null;
  status: string | null;
  price: number;
  player_session?: {
    id: string;
    attendance_status: string;
  };
}

interface SessionListProps {
  campaignId: string;
}

export const SessionList = ({ campaignId }: SessionListProps) => {
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [confirmingSession, setConfirmingSession] = useState<string | null>(null);
  const [cancelingSession, setCancelingSession] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: sessions, isLoading, refetch } = useQuery({
    queryKey: ["sessions", campaignId],
    queryFn: async () => {
      // First get the player id
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user?.id)
        .single();

      if (!playerData) return [];

      const { data, error } = await supabase
        .from("sessions")
        .select(`
          *,
          player_session:player_sessions(
            id,
            attendance_status
          )
        `)
        .eq("campaign_id", campaignId)
        .eq("player_sessions.player_id", playerData.id)
        .order("session_number", { ascending: true });

      if (error) throw error;
      return data as Session[];
    },
    enabled: !!user,
  });

  const handleConfirmAttendance = async (sessionId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to confirm attendance",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (!playerData) {
        toast({
          title: "Error",
          description: "Player profile not found",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("player_sessions")
        .insert({
          player_id: playerData.id,
          session_id: sessionId,
          attendance_status: "confirmed",
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Attendance confirmed",
      });

      refetch();
    } catch (error) {
      console.error("Error confirming attendance:", error);
      toast({
        title: "Error",
        description: "Failed to confirm attendance",
        variant: "destructive",
      });
    }
    setConfirmingSession(null);
  };

  const handleCancelAttendance = async (sessionId: string) => {
    if (!user) return;

    try {
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (!playerData) return;

      const { error } = await supabase
        .from("player_sessions")
        .delete()
        .eq("session_id", sessionId)
        .eq("player_id", playerData.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Attendance cancelled",
      });

      refetch();
    } catch (error) {
      console.error("Error cancelling attendance:", error);
      toast({
        title: "Error",
        description: "Failed to cancel attendance",
        variant: "destructive",
      });
    }
    setCancelingSession(null);
  };

  if (isLoading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div className="space-y-4">
      {sessions && sessions.length > 0 ? (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white p-4 rounded-lg shadow-sm border"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {!session.player_session ? (
                    <>
                      <Button
                        onClick={() => setConfirmingSession(session.id)}
                        className="bg-yellow-500 hover:bg-yellow-600"
                      >
                        Confirm
                      </Button>
                      <Dialog open={confirmingSession === session.id} onOpenChange={() => setConfirmingSession(null)}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Attendance</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to confirm your attendance for Session {session.session_number}?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmingSession(null)}>
                              Cancel
                            </Button>
                            <Button onClick={() => handleConfirmAttendance(session.id)}>
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setCancelingSession(session.id)}
                        variant="outline"
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Dialog open={cancelingSession === session.id} onOpenChange={() => setCancelingSession(null)}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cancel Attendance</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to cancel your attendance for Session {session.session_number}?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setCancelingSession(null)}>
                              No
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleCancelAttendance(session.id)}
                            >
                              Yes, Cancel
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                  <div>
                    <h3 className="font-medium">Session {session.session_number}</h3>
                    <p className="text-sm text-gray-500">{session.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${session.price}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(session.start_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No sessions scheduled yet.</p>
      )}

      <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
        <DialogTrigger asChild>
          <Button className="bg-yellow-500 hover:bg-yellow-600">
            Add Session
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Session</DialogTitle>
          </DialogHeader>
          <SessionForm 
            campaignId={campaignId} 
            onSuccess={() => setIsAddSessionOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};