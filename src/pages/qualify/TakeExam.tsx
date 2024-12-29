import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useState } from "react";

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const { data: player } = useQuery({
    queryKey: ['player', user?.email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('email', user?.email)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.email
  });

  const { data: exam } = useQuery({
    queryKey: ['exam', examId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('id', examId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!examId
  });

  const { data: questions } = useQuery({
    queryKey: ['exam_questions', examId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exam_questions')
        .select('*')
        .eq('exam_id', examId)
        .order('order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!examId
  });

  const submitAnswersMutation = useMutation({
    mutationFn: async () => {
      if (!player || !questions) return;

      const answerPromises = questions.map(question => {
        return supabase
          .from('player_exam_answers')
          .insert({
            player_id: player.id,
            exam_id: examId,
            exam_question_id: question.id,
            text_answer: answers[question.id] || null
          });
      });

      await Promise.all(answerPromises);
    },
    onSuccess: () => {
      toast({
        title: "Exam Submitted",
        description: "Your answers have been submitted for review",
      });
      navigate('/my/games');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit exam answers",
        variant: "destructive",
      });
      console.error('Error submitting answers:', error);
    }
  });

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    if (!questions || !player) return;
    
    // Check if all questions are answered
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0) {
      toast({
        title: "Missing Answers",
        description: "Please answer all questions before submitting",
        variant: "destructive",
      });
      return;
    }

    submitAnswersMutation.mutate();
  };

  if (!exam || !questions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8 pt-24">
        <Card>
          <CardHeader>
            <CardTitle>{exam.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <h3 className="font-medium">{question.name}</h3>
                <Input
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder="Enter your answer"
                />
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={submitAnswersMutation.isPending}
                className="bg-gold hover:bg-gold/90"
              >
                Submit Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TakeExam;