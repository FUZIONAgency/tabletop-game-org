import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Campaign } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

type FormData = {
  title: string;
  description: string;
  type_id: string;
  min_players: number;
  max_players: number;
  price: number;
};

interface EditCampaignFormProps {
  campaign: Campaign;
}

export const EditCampaignForm = ({ campaign }: EditCampaignFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      title: campaign.title,
      description: campaign.description || '',
      type_id: campaign.type_id || '',
      min_players: campaign.min_players,
      max_players: campaign.max_players,
      price: campaign.price,
    }
  });

  // Get the return path from state, fallback to /my/games if not set
  const returnPath = location.state?.from || '/my/games';

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

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({
          title: data.title,
          description: data.description,
          type_id: data.type_id,
          min_players: data.min_players,
          max_players: data.max_players,
          price: data.price,
        })
        .eq('id', campaign.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign updated successfully",
      });

      navigate(returnPath);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update campaign",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type_id">Type</Label>
        <Select
          onValueChange={(value) => setValue("type_id", value)}
          defaultValue={campaign.type_id || ""}
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="min_players">Min Players</Label>
          <Input
            id="min_players"
            type="number"
            {...register("min_players", { 
              required: true,
              valueAsNumber: true,
              min: 1
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_players">Max Players</Label>
          <Input
            id="max_players"
            type="number"
            {...register("max_players", { 
              required: true,
              valueAsNumber: true,
              min: 1
            })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { 
            required: true,
            valueAsNumber: true,
            min: 0
          })}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit">
          Save Changes
        </Button>
        <Button 
          type="button" 
          variant="outline"
          onClick={() => navigate(returnPath)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};