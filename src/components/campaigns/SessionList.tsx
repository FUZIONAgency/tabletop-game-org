import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SessionForm } from "./SessionForm";
import { useState } from "react";

interface Session {
  id: string;
  campaign_id: string;
  session_number: number;
  start_date: string;
  end_date: string | null;
  description: string | null;
  status: string | null;
  price: number;
}

interface SessionListProps {
  campaignId: string;
}

export const SessionList = ({ campaignId }: SessionListProps) => {
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions", campaignId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("campaign_id", campaignId)
        .order("session_number", { ascending: true });

      if (error) throw error;
      return data as Session[];
    },
  });

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
                <div>
                  <h3 className="font-medium">Session {session.session_number}</h3>
                  <p className="text-sm text-gray-500">{session.description}</p>
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