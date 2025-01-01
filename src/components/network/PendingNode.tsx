import { Clock } from "lucide-react";

export const PendingNode = () => {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-yellow-400 bg-yellow-50 min-w-[200px]">
      <Clock className="w-5 h-5 text-yellow-600" />
      <span className="text-sm font-medium text-yellow-700">Pending Acceptance</span>
    </div>
  );
};