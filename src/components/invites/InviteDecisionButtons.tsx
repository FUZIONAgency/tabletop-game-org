import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleInviteDecision } from "@/utils/inviteOperations";
import { toast } from "@/components/ui/use-toast";

interface InviteDecisionButtonsProps {
  invite: any;
  currentPlayerId: string;
  onSuccess: () => void;
}

export const InviteDecisionButtons = ({ 
  invite, 
  currentPlayerId,
  onSuccess 
}: InviteDecisionButtonsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDecision = async (decision: 'Accepted' | 'Declined') => {
    setIsProcessing(true);
    try {
      await handleInviteDecision(invite, decision, currentPlayerId);
      toast({
        title: "Success",
        description: `Invite has been ${decision.toLowerCase()} successfully.`,
      });
      onSuccess();
    } catch (error) {
      console.error("Error handling invite decision:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${decision.toLowerCase()} invite. Please try again.`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (invite.status === 'accepted') {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="bg-black text-white hover:bg-black"
      >
        Accepted
      </Button>
    );
  }

  if (!invite.decision) {
    return (
      <>
        <Button
          variant="default"
          size="sm"
          onClick={() => handleDecision('Accepted')}
          className="bg-green-500 hover:bg-green-600"
          disabled={isProcessing}
        >
          Accept
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDecision('Declined')}
          disabled={isProcessing}
        >
          Decline
        </Button>
      </>
    );
  }

  return null;
};