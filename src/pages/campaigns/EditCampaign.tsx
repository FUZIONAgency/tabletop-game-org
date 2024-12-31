import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";

const EditCampaign = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Section
          id="edit-campaign"
          title="Edit Campaign"
          subtitle="Update your campaign details"
        >
          <p>Edit campaign form will go here for campaign ID: {id}</p>
        </Section>
      </main>
    </div>
  );
};

export default EditCampaign;