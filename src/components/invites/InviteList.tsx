import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface Invite {
  id: string;
  email: string;
  status: string;
  first_name: string | null;
  last_name: string | null;
  cell: string | null;
  date_sent: string | null;
  date_read: string | null;
  date_decided: string | null;
}

interface InviteListProps {
  invites: Invite[];
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    unsent: "bg-gray-500",
    sent: "bg-blue-500",
    read: "bg-yellow-500",
    clicked: "bg-purple-500",
    accepted: "bg-green-500",
    declined: "bg-red-500",
    canceled: "bg-gray-700",
  };
  return colors[status] || "bg-gray-500";
};

export const InviteList = ({ invites }: InviteListProps) => {
  return (
    <div className="grid gap-4">
      {invites.map((invite) => (
        <Card key={invite.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {invite.first_name
                  ? `${invite.first_name} ${invite.last_name}`
                  : invite.email}
              </p>
              <p className="text-sm text-muted-foreground">{invite.email}</p>
            </div>
            <Badge
              variant="secondary"
              className={`${getStatusColor(invite.status)} text-white`}
            >
              {invite.status}
            </Badge>
          </div>
        </Card>
      ))}
      {invites.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No invites yet. Start growing your network!
        </p>
      )}
    </div>
  );
};