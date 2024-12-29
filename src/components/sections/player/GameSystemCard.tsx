import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Plus } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

interface PlayerExam {
  id: string;
  exam_id: string;
  score: number | null;
}

interface AddGameSystemFormValues {
  gameSystemId: string;
  accountId: string;
}

export const GameSystemCard = ({ gameSystem }: { gameSystem?: GameSystem }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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

  const { data: gameSystems } = useQuery({
    queryKey: ['game_systems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('game_systems')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  const form = useForm<AddGameSystemFormValues>();

  const onSubmit = async (values: AddGameSystemFormValues) => {
    if (!player) return;

    try {
      const { error } = await supabase
        .from('player_game_accounts')
        .insert({
          player_id: player.id,
          game_system_id: values.gameSystemId,
          account_id: values.accountId
        });

      if (error) throw error;

      toast.success("Game system added successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding game system:', error);
      toast.error("Failed to add game system");
    }
  };

  // If this is the "Add More Games" card
  if (!gameSystem) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold">Add More Game Systems</h3>
              </div>
              <Button className="bg-gold hover:bg-gold/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Games
              </Button>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Game System</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="gameSystemId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game System</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a game system" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gameSystems?.map((system) => (
                          <SelectItem key={system.id} value={system.id}>
                            {system.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your account ID" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  const { data: playerGameAccount } = useQuery({
    queryKey: ['player_game_account', player?.id, gameSystem.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('player_game_accounts')
        .select('*')
        .eq('player_id', player?.id)
        .eq('game_system_id', gameSystem.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!player?.id
  });

  const { data: exams } = useQuery({
    queryKey: ['exams', gameSystem.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('game_system_id', gameSystem.id);
      
      if (error) throw error;
      return data as Exam[];
    }
  });

  const { data: playerExams } = useQuery({
    queryKey: ['player_exams', gameSystem.id],
    queryFn: async () => {
      if (!player) return [];

      const { data, error } = await supabase
        .from('player_exams')
        .select('*')
        .eq('player_id', player.id);

      if (error) throw error;
      return data as PlayerExam[];
    },
    enabled: !!player?.id
  });

  const hasCertification = playerExams && playerExams.length > 0;

  if (!playerGameAccount) {
    return null;
  }

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
          <h3 className="text-lg font-semibold">{gameSystem.name}</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasCertification ? (
          <div className="flex items-center gap-2 text-green-600">
            <Trophy className="h-5 w-5" />
            <span>Certified!</span>
          </div>
        ) : (
          <div className="space-y-2">
            {exams?.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between">
                <span className="text-sm">{exam.name}</span>
                <Button 
                  variant="default" 
                  className="bg-gold hover:bg-gold/90 text-white"
                >
                  Take Exam
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
