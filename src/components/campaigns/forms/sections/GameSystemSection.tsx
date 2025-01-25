import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UseFormSetValue } from "react-hook-form";
import { CampaignFormData } from "../types";

type Props = {
  setValue: UseFormSetValue<CampaignFormData>;
  error?: boolean;
};

export function GameSystemSection({ setValue, error }: Props) {
  const { data: gameSystems } = useQuery({
    queryKey: ['gameSystems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('game_systems')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className={`space-y-2 ${error ? 'border-red-500 rounded-md border p-2' : ''}`}>
      <Label htmlFor="game_system_id">Game System</Label>
      <Select
        onValueChange={(value) => {
          setValue("game_system_id", value);
          if (!value) {
            toast.error("Please select a game system");
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select game system" />
        </SelectTrigger>
        <SelectContent>
          {gameSystems?.map((system) => (
            <SelectItem key={system.id} value={system.id}>
              {system.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}