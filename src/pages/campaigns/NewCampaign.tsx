import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { EditCampaignForm } from "@/components/campaigns/EditCampaignForm";
import Section from "@/components/Section";

const NewCampaign = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const defaultCampaign = {
    id: '',
    title: '',
    description: '',
    type_id: '',
    min_players: 1,
    max_players: 4,
    price: 0,
    status: 'active',
    created_at: new Date().toISOString(),
    game_system_id: '',
    auth_id: '',
    game_system: {
      name: '',
      description: null,
      logo_image_url: null
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Section
          id="new-campaign"
          title="Create New Game"
          subtitle="Set up your game details"
        >
          <EditCampaignForm campaign={defaultCampaign} />
        </Section>
      </main>
    </div>
  );
};

export default NewCampaign;