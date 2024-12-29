import { Skeleton } from "@/components/ui/skeleton";
import { PlayerExam } from "@/types/exam";
import { Button } from "@/components/ui/button";

interface CompletedExamsProps {
  completedExams: PlayerExam[] | undefined;
  isLoading: boolean;
}

const CompletedExams = ({ completedExams, isLoading }: CompletedExamsProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {completedExams?.map((exam) => (
        <div 
          key={exam.id} 
          className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            {exam.exam?.game_system?.logo_image_url && (
              <img
                src={exam.exam.game_system.logo_image_url}
                alt={exam.exam.game_system.name}
                className="h-12 w-12 object-contain"
              />
            )}
            <div>
              <h3 className="font-semibold">{exam.exam?.name}</h3>
              <p className="text-sm text-gray-600">
                {exam.exam?.game_system?.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            {exam.score ? (
              <div className="font-semibold">
                Score: {exam.score}%
              </div>
            ) : (
              <Button 
                disabled 
                className="bg-[#800020] hover:bg-[#800020]/90 cursor-not-allowed"
              >
                In Review
              </Button>
            )}
          </div>
        </div>
      ))}
      {completedExams?.length === 0 && (
        <p className="text-gray-600 text-center py-8">
          You haven't taken any exams yet.
        </p>
      )}
    </div>
  );
};

export default CompletedExams;