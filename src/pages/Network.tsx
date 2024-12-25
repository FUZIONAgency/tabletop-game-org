import NetworkSection from "@/components/sections/NetworkSection";
import InvitesSection from "@/components/sections/InvitesSection";
import Navigation from "@/components/Navigation";

const Network = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <NetworkSection />
        <InvitesSection />
      </div>
    </div>
  );
};

export default Network;