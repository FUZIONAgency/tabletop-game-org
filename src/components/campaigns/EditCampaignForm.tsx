import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Campaign } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EditFormData } from "./forms/types";
import { EditCampaignBasicInfo } from "./forms/EditCampaignBasicInfo";
import { EditCampaignTypeSelect } from "./forms/EditCampaignTypeSelect";
import { EditCampaignPlayerCount } from "./forms/EditCampaignPlayerCount";
import { EditCampaignPrice } from "./forms/EditCampaignPrice";

interface EditCampaignFormProps {
  campaign: Campaign;
}

export const EditCampaignForm = ({ campaign }: EditCampaignFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { register, handleSubmit, setValue } = useForm<EditFormData>({
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

  const onSubmit = async (data: EditFormData) => {
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
      <EditCampaignBasicInfo 
        register={register}
        defaultValues={{
          title: campaign.title,
          description: campaign.description || ''
        }}
      />

      <EditCampaignTypeSelect
        defaultValue={campaign.type_id || ''}
        onValueChange={(value) => setValue("type_id", value)}
      />

      <EditCampaignPlayerCount
        register={register}
        defaultValues={{
          min_players: campaign.min_players,
          max_players: campaign.max_players
        }}
      />

      <EditCampaignPrice
        register={register}
        defaultValue={campaign.price}
      />

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