import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Exam } from "@/types/exam";
import TakeExamForm from "./TakeExamForm";

interface AvailableExamsProps {
  availableExams: Exam[] | undefined;
  completedExamIds: string[];
  isLoading: boolean;
  playerId?: string;
}

const AvailableExams = ({ availableExams, completedExamIds, isLoading, playerId }: AvailableExamsProps) => {
  const navigate = useNavigate();
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  const filteredExams = availableExams?.filter(exam => !completedExamIds.includes(exam.id)) || [];

  if (selectedExamId && playerId) {
    return (
      <TakeExamForm
        examId={selectedExamId}
        playerId={playerId}
        onComplete={() => setSelectedExamId(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {filteredExams.map((exam) => (
        <div 
          key={exam.id} 
          className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            {exam.game_system?.logo_image_url && (
              <img
                src={exam.game_system.logo_image_url}
                alt={exam.game_system.name}
                className="h-12 w-12 object-contain"
              />
            )}
            <div>
              <h3 className="font-semibold">{exam.name}</h3>
              <p className="text-sm text-gray-600">
                {exam.game_system?.name}
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setSelectedExamId(exam.id)}
            className="bg-gold hover:bg-gold/90"
          >
            Take Exam
          </Button>
        </div>
      ))}
      {filteredExams.length === 0 && (
        <p className="text-gray-600 text-center py-8">
          No exams are currently available. Add more games to unlock exams.
        </p>
      )}
    </div>
  );
};

export default AvailableExams;