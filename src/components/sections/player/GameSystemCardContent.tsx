import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GameSystem {
  id: string;
  name: string;
  description: string | null;
  logo_image_url: string | null;
}

interface Exam {
  id: string;
  name: string;
  weight: number;
}

interface GameSystemCardContentProps {
  gameSystem: GameSystem;
  exams?: Exam[];
  hasCertification: boolean;
  accountId: string;
  completedExamIds?: string[];
}

export const GameSystemCardContent = ({ 
  gameSystem, 
  exams, 
  hasCertification, 
  accountId,
  completedExamIds = []
}: GameSystemCardContentProps) => {
  const navigate = useNavigate();

  const handleTakeExam = () => {
    navigate('/my/exams');
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-4 w-full">
          {gameSystem.logo_image_url && (
            <img
              src={gameSystem.logo_image_url}
              alt={gameSystem.name}
              className="h-12 w-12 object-contain"
            />
          )}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{gameSystem.name}</h3>
            {hasCertification && (
              <Trophy className="h-5 w-5 text-green-600" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 mb-2">
          Account ID: {accountId}
        </div>
        <div className="space-y-2">
          {exams?.map((exam) => (
            <div key={exam.id} className="flex items-center justify-between">
              <span className="text-sm">{exam.name}</span>
              {completedExamIds.includes(exam.id) ? (
                <Button 
                  variant="default" 
                  className="bg-black hover:bg-black/90 text-white cursor-not-allowed"
                  disabled
                >
                  Certified
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  className="bg-gold hover:bg-gold/90 text-white"
                  onClick={handleTakeExam}
                >
                  Take Exam
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};