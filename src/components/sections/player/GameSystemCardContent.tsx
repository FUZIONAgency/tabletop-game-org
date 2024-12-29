import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
}: GameSystemCardContentProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="h-full cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate('/my/exams')}
    >
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};