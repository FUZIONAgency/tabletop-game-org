import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const PendingNode = () => {
  return (
    <Card className="p-4 mb-4 w-32 text-center bg-yellow-50 border-yellow-200">
      <div className="flex flex-col items-center gap-2">
        <Clock className="h-4 w-4 text-yellow-600" />
        <p className="font-medium text-sm text-yellow-800">Pending Acceptance</p>
      </div>
    </Card>
  );
};