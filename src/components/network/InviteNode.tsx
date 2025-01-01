import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InviteForm } from "../invites/InviteForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InviteNodeProps {
  onInviteCreated?: (invite: any) => void;
  pendingDownlines?: Array<{
    id: string;
    relationshipId: string;
    alias: string;
  }>;
  onRelationshipUpdated?: () => void;
}

export const InviteNode = ({ 
  onInviteCreated, 
  pendingDownlines = [], 
  onRelationshipUpdated 
}: InviteNodeProps) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const { toast } = useToast();

  const handleNewInviteClick = () => {
    if (pendingDownlines.length > 0) {
      setIsPendingModalOpen(true);
    } else {
      setIsInviteModalOpen(true);
    }
  };

  const handleAcceptDownline = async (relationshipId: string) => {
    try {
      const { error } = await supabase
        .from('player_relationships')
        .update({ status: 'active' })
        .eq('id', relationshipId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Player relationship accepted",
      });

      setIsPendingModalOpen(false);
      if (onRelationshipUpdated) {
        onRelationshipUpdated();
      }
    } catch (error) {
      console.error('Error accepting downline:', error);
      toast({
        title: "Error",
        description: "Failed to accept player relationship",
        variant: "destructive",
      });
    }
  };

  const handleDeclineDownline = async (relationshipId: string) => {
    try {
      const { error } = await supabase
        .from('player_relationships')
        .delete()
        .eq('id', relationshipId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Player relationship declined",
      });

      setIsPendingModalOpen(false);
      if (onRelationshipUpdated) {
        onRelationshipUpdated();
      }
    } catch (error) {
      console.error('Error declining downline:', error);
      toast({
        title: "Error",
        description: "Failed to decline player relationship",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card 
        className={`p-4 mb-4 w-32 text-center ${
          pendingDownlines.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white hover:bg-gold'
        }`}
      >
        <DialogTrigger asChild>
          <a 
            href="#" 
            className="flex items-center justify-center gap-1 text-inherit"
            onClick={handleNewInviteClick}
          >
            <Plus className="h-4 w-4" />
            {pendingDownlines.length > 0 ? 'In Review' : 'New Invite'}
          </a>
        </DialogTrigger>
      </Card>

      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send New Invite</DialogTitle>
          </DialogHeader>
          <InviteForm
            onInviteCreated={onInviteCreated}
            onClose={() => setIsInviteModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isPendingModalOpen} onOpenChange={setIsPendingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pending Invites</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {pendingDownlines.map((downline) => (
              <div key={downline.id} className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">{downline.alias}</span>
                <div className="space-x-2">
                  <Button
                    variant="default"
                    onClick={() => handleAcceptDownline(downline.relationshipId)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeclineDownline(downline.relationshipId)}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};