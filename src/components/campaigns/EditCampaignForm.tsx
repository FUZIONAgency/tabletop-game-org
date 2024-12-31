import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

type FormData = {
  title: string;
  description: string;
  type: string;
  min_players: number;
  max_players: number;
  price: number;
};

interface EditCampaignFormProps {
  campaign: Campaign;
}

export const EditCampaignForm = ({ campaign }: EditCampaignFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      title: campaign.title,
      description: campaign.description || '',
      type: campaign.type || '',
      min_players: campaign.min_players,
      max_players: campaign.max_players,
      price: campaign.price,
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({
          title: data.title,
          description: data.description,
          type: data.type,
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

      navigate('/my/games');
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
        <Label htmlFor="type">Type</Label>
        <Select
          onValueChange={(value) => setValue("type", value)}
          defaultValue={campaign.type || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="retailer">Retailer</SelectItem>
            <SelectItem value="convention">Convention</SelectItem>
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
          onClick={() => navigate('/my/games')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};