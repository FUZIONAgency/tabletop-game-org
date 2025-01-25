import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  gameSystemId: z.string({
    required_error: "Please select a game system",
  }),
  accountId: z.string({
    required_error: "Please enter your account ID",
  }).min(1, "Account ID is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddGameSystemModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  playerId: string;
}

export const AddGameSystemModal = ({ isOpen, onOpenChange, playerId }: AddGameSystemModalProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameSystemId: "",
      accountId: "",
    },
  });

  const queryClient = useQueryClient();

  const { data: gameSystems } = useQuery({
    queryKey: ['game-systems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('game_systems')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { error } = await supabase
        .from('player_game_accounts')
        .insert({
          player_id: playerId,
          game_system_id: values.gameSystemId,
          account_id: values.accountId,
        });

      if (error) throw error;

      toast.success("Game system added successfully!");
      
      // Invalidate both queries that need to be refreshed
      queryClient.invalidateQueries({ queryKey: ['my-game-systems'] });
      queryClient.invalidateQueries({ queryKey: ['my-games'] });
      
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Error adding game system:', error);
      toast.error("Failed to add game system");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Game System</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="gameSystemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game System</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Add Game System</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};