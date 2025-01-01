import { useState } from "react";
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
  const { toast } = useToast();

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
          <DialogDescription>
            Would you like to accept or cancel this relationship?
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