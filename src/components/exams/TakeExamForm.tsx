import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TakeExamFormProps {
  examId: string;
  playerId: string;
  onComplete: () => void;
}

const TakeExamForm = ({ examId, playerId, onComplete }: TakeExamFormProps) => {
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: questions, isLoading } = useQuery({
    queryKey: ["exam-questions", examId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exam_questions")
        .select("*")
        .eq("exam_id", examId)
        .order("order", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const createExamMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("player_exams")
        .insert([
          {
            player_id: playerId,
            exam_id: examId,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async ({ questionId, answer }: { questionId: string; answer: string }) => {
      const { error } = await supabase
        .from("player_exam_answers")
        .insert([
          {
            player_id: playerId,
            exam_id: examId,
            exam_question_id: questionId,
            text_answer: answer,
          },
        ]);

      if (error) throw error;
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      // First create the exam entry
      const examEntry = await createExamMutation.mutateAsync();
      
      // Then submit all answers
      const answers = questions?.map(async (question) => {
        const answer = formData.get(`question-${question.id}`) as string;
        if (answer) {
          await submitAnswerMutation.mutateAsync({
            questionId: question.id,
            answer,
          });
        }
      });

      if (answers) {
        await Promise.all(answers);
      }

      toast({
        title: "Exam Submitted",
        description: "Your exam has been submitted successfully.",
      });

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["completed-exams"] });
      queryClient.invalidateQueries({ queryKey: ["available-exams"] });
      
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your exam. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUrlClick = (url: string) => {
    setSelectedUrl(url);
    setUrlModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions?.map((question, index) => (
          <div key={question.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <label 
                htmlFor={`question-${question.id}`} 
                className="block font-medium"
              >
                {index + 1}. {question.name}
              </label>
              {question.url && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUrlClick(question.url!)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Resource
                </Button>
              )}
            </div>
            <Textarea
              id={`question-${question.id}`}
              name={`question-${question.id}`}
              placeholder="Enter your answer"
              className="min-h-[100px]"
              required
            />
          </div>
        ))}
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/my/exams")}
          >
            Cancel
          </Button>
          <Button type="submit">
            Submit Exam
          </Button>
        </div>
      </form>

      <Dialog open={urlModalOpen} onOpenChange={setUrlModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>External Resource</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              src={selectedUrl}
              className="w-full h-full"
              title="External resource"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TakeExamForm;