import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RetailerSelect } from "./RetailerSelect";
import { GameSystemSelect } from "./GameSystemSelect";
import { CampaignTypeSelect } from "./CampaignTypeSelect";
import { PlayerCountInputs } from "./PlayerCountInputs";
import { PriceInput } from "./PriceInput";
import { CampaignBasicInfo } from "./CampaignBasicInfo";
import { FormData } from "./types";

export function CampaignForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (!user?.id) {
        toast.error("You must be logged in to create a campaign");
        return;
      }

      // Validate required fields
      if (!data.game_system_id) {
        toast.error("Please select a game system");
        return;
      }

      if (!data.type_id) {
        toast.error("Please select a campaign type");
        return;
      }

      const { error } = await supabase
        .from('campaigns')
        .insert({
          title: data.title,
          description: data.description,
          type_id: data.type_id,
          min_players: data.min_players,
          max_players: data.max_players,
          price: data.price,
          game_system_id: data.game_system_id,
          retailer_id: data.retailer_id || null,
          auth_id: user.id
        });

      if (error) {
        console.error('Error creating campaign:', error);
        toast.error("Failed to create campaign");
        return;
      }

      toast.success("Campaign created successfully");
      navigate('/my/games');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error("Failed to create campaign");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <CampaignBasicInfo register={register} errors={errors} />
      <GameSystemSelect setValue={setValue} />
      <RetailerSelect setValue={setValue} userId={user?.id} />
      <CampaignTypeSelect setValue={setValue} />
      <PlayerCountInputs register={register} errors={errors} />
      <PriceInput register={register} errors={errors} />

      <div className="flex gap-4">
        <Button type="submit">
          Create Campaign
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
}