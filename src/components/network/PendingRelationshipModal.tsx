import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PendingRelationshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  relationshipId: string;
  onStatusUpdate: () => void;
}

export const PendingRelationshipModal = ({
  isOpen,
  onClose,
  relationshipId,
  onStatusUpdate,
}: PendingRelationshipModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestorEmail, setRequestorEmail] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequestorEmail = async () => {
      if (!relationshipId) return;

      try {
        // First get the relationship to find the downline_id
        const { data: relationshipData, error: relationshipError } = await supabase
          .from('player_relationships')
          .select('downline_id')
          .eq('id', relationshipId)
          .single();

        if (relationshipError) throw relationshipError;
        if (!relationshipData) return;

        // Then get the player's email using the downline_id
        const { data: playerData, error: playerError } = await supabase
          .from('players')
          .select('email')
          .eq('id', relationshipData.downline_id)
          .single();

        if (playerError) throw playerError;
        if (playerData) {
          setRequestorEmail(playerData.email || "");
        }
      } catch (error) {
        console.error('Error fetching requestor email:', error);
      }
    };

    if (isOpen) {
      fetchRequestorEmail();
    }
  }, [relationshipId, isOpen]);

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('player_relationships')
        .update({ status: 'active' })
        .eq('id', relationshipId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Relationship accepted successfully",
      });
      
      // Call onStatusUpdate before closing the modal
      onStatusUpdate();
      onClose();
    } catch (error) {
      console.error('Error accepting relationship:', error);
      toast({
        title: "Error",
        description: "Failed to accept relationship",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('player_relationships')
        .delete()
        .eq('id', relationshipId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Relationship cancelled successfully",
      });
      
      // Call onStatusUpdate before closing the modal
      onStatusUpdate();
      onClose();
    } catch (error) {
      console.error('Error cancelling relationship:', error);
      toast({
        title: "Error",
        description: "Failed to cancel relationship",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pending Relationship</DialogTitle>
          <DialogDescription className="space-y-2">
            <p>Would you like to accept or cancel this relationship request from:</p>
            <p className="font-medium text-foreground">{requestorEmail}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel Relationship
          </Button>
          <Button
            onClick={handleAccept}
            disabled={isLoading}
          >
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};