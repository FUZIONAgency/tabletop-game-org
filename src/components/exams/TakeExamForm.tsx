import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface TakeExamFormProps {
  examId: string;
  playerId: string;
  onComplete: () => void;
}

const TakeExamForm = ({ examId, playerId, onComplete }: TakeExamFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Dynamically create form schema based on questions
  const createFormSchema = (questions: any[]) => {
    const schemaFields: Record<string, z.ZodString> = {};
    questions?.forEach((question) => {
      schemaFields[`question-${question.id}`] = z.string().min(1, "Answer is required");
    });
    return z.object(schemaFields);
  };

  const form = useForm({
    resolver: zodResolver(questions ? createFormSchema(questions) : z.object({})),
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

  const onSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true);
      
      // First create the exam entry
      const examEntry = await createExamMutation.mutateAsync();
      
      // Then submit all answers
      const answers = questions?.map(async (question) => {
        const answer = formData[`question-${question.id}`];
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
      console.error("Error submitting exam:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your exam. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResourceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {questions?.map((question, index) => (
            <FormField
              key={question.id}
              control={form.control}
              name={`question-${question.id}`}
              render={({ field }) => (
                <FormItem>
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
                        onClick={() => handleResourceClick(question.url!)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Resource
                      </Button>
                    )}
                  </div>
                  <Textarea
                    {...field}
                    id={`question-${question.id}`}
                    placeholder="Enter your answer"
                    className="min-h-[100px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/my/exams")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Exam"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TakeExamForm;