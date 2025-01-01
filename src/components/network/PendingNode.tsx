import { useState } from "react";
import { Clock } from "lucide-react";
import { PendingRelationshipModal } from "./PendingRelationshipModal";

interface PendingNodeProps {
  relationshipId: string;
  onStatusUpdate: () => void;
}

export const PendingNode = ({ relationshipId, onStatusUpdate }: PendingNodeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-yellow-400 bg-yellow-50 min-w-[200px] cursor-pointer hover:bg-yellow-100 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <Clock className="w-5 h-5 text-yellow-600" />
        <span className="text-sm font-medium text-yellow-700">Pending Acceptance</span>
      </div>
      <PendingRelationshipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        relationshipId={relationshipId}
        onStatusUpdate={onStatusUpdate}
      />
    </>
  );
};