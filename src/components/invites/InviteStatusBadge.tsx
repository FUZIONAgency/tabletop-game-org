import { Badge } from "../ui/badge";

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

interface InviteStatusBadgeProps {
  status: string;
}

export const InviteStatusBadge = ({ status }: InviteStatusBadgeProps) => (
  <Badge
    variant="secondary"
    className={`${getStatusColor(status)} text-white`}
  >
    {status}
  </Badge>
);