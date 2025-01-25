import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SessionForm } from "./SessionForm";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { SessionCard } from "./SessionCard";
import { Session } from "@/types/session";

interface SessionListProps {
  campaignId: string;
}

export const SessionList = ({ campaignId }: SessionListProps) => {
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: sessions, isLoading, refetch } = useQuery({
    queryKey: ["sessions", campaignId],
    queryFn: async () => {
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
          ),
          campaign:campaigns(
            id,
            retailer_id,
            retailer:retailers(
              id,
              name
            )
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
  };

  if (isLoading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div className="space-y-4">
      {sessions && sessions.length > 0 ? (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onConfirmAttendance={handleConfirmAttendance}
              onCancelAttendance={handleCancelAttendance}
            />
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