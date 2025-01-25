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

type FormData = {
  title: string;
  description: string;
  type_id: string;
  min_players: number;
  max_players: number;
  price: number;
  game_system_id: string;
  retailer_id?: string;
};

export function CampaignForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
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
          auth_id: user?.id
        });

      if (error) throw error;

      toast.success("Campaign created successfully");
      navigate('/my/games');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error("Failed to create campaign");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <CampaignBasicInfo register={register} />
      <GameSystemSelect setValue={setValue} />
      <RetailerSelect setValue={setValue} userId={user?.id} />
      <CampaignTypeSelect setValue={setValue} />
      <PlayerCountInputs register={register} />
      <PriceInput register={register} />

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