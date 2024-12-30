import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, X } from "lucide-react";
import { Invite } from "@/types/invite";
import { ReactNode } from "react";

interface InviteCardProps {
  invite: Invite;
  type: 'sent' | 'received';
  onResend: (invite: Invite) => void;
  onCancel: (inviteId: string) => void;
  decisionButtons?: ReactNode;
}

export const InviteCard = ({ 
  invite, 
  type,
  onResend,
  onCancel,
  decisionButtons
}: InviteCardProps) => {
  const renderActions = () => {
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

    return decisionButtons;
  };

  return (
    <Card key={invite.id} className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-medium">
            {invite.first_name
              ? `${invite.first_name} ${invite.last_name}`
              : invite.email}
          </p>
          <p className="text-sm text-muted-foreground">{invite.email}</p>
          {invite.date_sent && (
            <p className="text-sm text-muted-foreground">
              Sent: {new Date(invite.date_sent).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {renderActions()}
        </div>
      </div>
    </Card>
  );
};