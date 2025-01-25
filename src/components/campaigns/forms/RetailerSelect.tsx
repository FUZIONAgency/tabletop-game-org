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
import { usePlayerData } from "@/components/network/hooks/usePlayerData";

type Props = {
  setValue: (name: "retailer_id", value: string) => void;
  userId?: string;
};

export function RetailerSelect({ setValue, userId }: Props) {
  const playerId = usePlayerData(userId);

  const { data: playerRetailers } = useQuery({
    queryKey: ['playerRetailers', playerId],
    queryFn: async () => {
      if (!playerId) return [];

      const { data, error } = await supabase
        .from('player_retailers')
        .select(`
          retailer:retailers (
            id,
            name
          )
        `)
        .eq('player_id', playerId)
        .eq('status', 'active');

      if (error) throw error;
      return data;
    },
    enabled: !!playerId
  });

  return (
    <div className="space-y-2">
      <Label htmlFor="retailer_id">Retailer (Optional)</Label>
      <Select
        onValueChange={(value) => setValue("retailer_id", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select retailer" />
        </SelectTrigger>
        <SelectContent>
          {playerRetailers?.map((pr) => (
            <SelectItem key={pr.retailer.id} value={pr.retailer.id}>
              {pr.retailer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}