import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { CampaignForm } from "@/components/campaigns/forms/CampaignForm";

const NewCampaign = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Section
          id="new-campaign"
          title="Create New Campaign"
          subtitle="Set up your new gaming campaign"
        >
          <CampaignForm />
        </Section>
      </main>
    </div>
  );
};

export default NewCampaign;