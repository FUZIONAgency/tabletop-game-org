import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface Session {
  id: string;
  session_number: number;
  start_date: string;
  description: string;
  campaign: {
    id: string;
    title: string;
    retailer_id: string | null;
  };
}

interface SessionCardProps {
  session: Session;
  onViewSession: (campaignId: string) => void;
  onViewRetailer: (retailerId: string) => void;
}

export const SessionCard = ({ session, onViewSession, onViewRetailer }: SessionCardProps) => {
  return (
    <Card key={session.id} className="p-4 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{session.campaign.title}</h4>
          <p className="text-sm text-gray-500">Session {session.session_number}</p>
          <p className="text-sm text-gray-500">
            {new Date(session.start_date).toLocaleDateString()}
          </p>
          {session.description && (
            <p className="text-sm text-gray-600 mt-2">{session.description}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => onViewSession(session.campaign.id)}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          {session.campaign.retailer_id && (
            <Button
              onClick={() => onViewRetailer(session.campaign.retailer_id!)}
              className="bg-black text-white hover:bg-gray-800"
            >
              Retailer
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};