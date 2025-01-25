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

type Props = {
  setValue: (name: "type_id", value: string) => void;
};

export function CampaignTypeSelect({ setValue }: Props) {
  const { data: campaignTypes } = useQuery({
    queryKey: ['campaignTypes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaign_types')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-2">
      <Label htmlFor="type_id">Campaign Type</Label>
      <Select
        onValueChange={(value) => setValue("type_id", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {campaignTypes?.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}