import { Button } from "../ui/button";
import { Mail, X, Check } from "lucide-react";
import { Invite } from "@/types/invite";

interface InviteActionsProps {
  invite: Invite;
  type: 'sent' | 'received';
  onResend: (invite: Invite) => void;
  onCancel: (inviteId: string) => void;
  onDecide: (invite: Invite, decision: 'Accepted' | 'Declined') => void;
}

export const InviteActions = ({ 
  invite, 
  type, 
  onResend, 
  onCancel,
  onDecide 
}: InviteActionsProps) => {
  if (type === 'sent') {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onResend(invite)}
          className="flex items-center gap-1"
        >
          <Mail className="h-4 w-4" />
          Resend
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCancel(invite.id)}
          className="flex items-center gap-1"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </>
    );
  }

  if (type === 'received') {
    if (invite.status === 'accepted') {
      return (
        <Button
          variant="outline"
          size="sm"
          disabled
          className="bg-black text-white hover:bg-black"
        >
          <Check className="h-4 w-4 mr-2" />
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
            onClick={() => onDecide(invite, 'Accepted')}
            className="bg-green-500 hover:bg-green-600"
          >
            Accept
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDecide(invite, 'Declined')}
          >
            Decline
          </Button>
        </>
      );
    }
  }

  return null;
};