import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddGameSystemFormValues {
  gameSystemId: string;
  accountId: string;
}

interface AddGameSystemModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  playerId: string;
}

export const AddGameSystemModal = ({ isOpen, onOpenChange, playerId }: AddGameSystemModalProps) => {
  const form = useForm<AddGameSystemFormValues>();
  const queryClient = useQueryClient();

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

  const onSubmit = async (values: AddGameSystemFormValues) => {
    try {
      const { error } = await supabase
        .from('player_game_accounts')
        .insert({
          player_id: playerId,
          game_system_id: values.gameSystemId,
          account_id: values.accountId
        });

      if (error) throw error;

      toast.success("Game system added successfully!");
      // Invalidate the my-games query without await
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
};