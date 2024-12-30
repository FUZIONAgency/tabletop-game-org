import { Card } from "../ui/card";
import { format } from "date-fns";
import { Invite } from "@/types/invite";
import { InviteStatusBadge } from "./InviteStatusBadge";
import { InviteActions } from "./InviteActions";

interface InviteCardProps {
  invite: Invite;
  type: 'sent' | 'received';
  onResend: (invite: Invite) => void;
  onCancel: (inviteId: string) => void;
  onDecide: (invite: Invite, decision: 'Accepted' | 'Declined') => void;
}

export const InviteCard = ({ 
  invite, 
  type,
  onResend,
  onCancel,
  onDecide
}: InviteCardProps) => {
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
              Sent: {format(new Date(invite.date_sent), "MMM d, yyyy 'at' h:mm a")}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <InviteStatusBadge status={invite.status} />
          <InviteActions
            invite={invite}
            type={type}
            onResend={onResend}
            onCancel={onCancel}
            onDecide={onDecide}
          />
        </div>
      </div>
    </Card>
  );
};