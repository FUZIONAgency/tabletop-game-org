import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CampaignFormData } from "./types";
import { usePlayerData } from "@/components/network/hooks/usePlayerData";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { GameSystemSection } from "./sections/GameSystemSection";
import { RetailerSection } from "./sections/RetailerSection";
import { CampaignTypeSection } from "./sections/CampaignTypeSection";
import { PlayerCountSection } from "./sections/PlayerCountSection";
import { PriceSection } from "./sections/PriceSection";

export function CampaignForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const playerId = usePlayerData(user?.id);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CampaignFormData>();

  const onSubmit = async (data: CampaignFormData) => {
    try {
      if (!user?.id) {
        toast.error("You must be logged in to create a campaign");
        return;
      }

      if (!playerId) {
        toast.error("Player profile not found");
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

      // First create the campaign
      const { data: campaign, error: campaignError } = await supabase
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
        })
        .select()
        .single();

      if (campaignError) {
        console.error('Error creating campaign:', campaignError);
        toast.error("Failed to create campaign");
        return;
      }

      // Then create the campaign_players record for the owner
      const { error: playerError } = await supabase
        .from('campaign_players')
        .insert({
          campaign_id: campaign.id,
          player_id: playerId,
          role_type: 'owner',
          status: 'active'
        });

      if (playerError) {
        console.error('Error setting campaign owner:', playerError);
        toast.error("Failed to set campaign owner");
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
      <BasicInfoSection register={register} errors={errors} />
      
      <GameSystemSection 
        setValue={setValue} 
        error={!!errors.game_system_id} 
      />
      
      <RetailerSection 
        setValue={setValue} 
        userId={user?.id} 
      />
      
      <CampaignTypeSection 
        setValue={setValue} 
        error={!!errors.type_id} 
      />
      
      <PlayerCountSection register={register} errors={errors} />
      
      <PriceSection register={register} errors={errors} />

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