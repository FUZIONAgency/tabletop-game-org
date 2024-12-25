import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import Section from "@/components/Section";
import SignUpSection from "@/components/sections/SignUpSection";
import GamesSection from "@/components/sections/GamesSection";
import HelpSection from "@/components/sections/HelpSection";
import RewardsSection from "@/components/sections/RewardsSection";

const Index = () => {
  return (
    <div className="bg-white">
      <Navigation />
      <HeroSection />
      
      {/* Sign Up Section */}
      <Section
        id="signup"
        title="Join Our Gaming Community"
        subtitle="SIGN UP"
        className="bg-white"
      >
        <SignUpSection />
      </Section>

      {/* Games Section */}
      <Section
        id="games"
        title="Play Anywhere, Anytime"
        subtitle="GAMES"
        className="bg-gray-50"
      >
        <GamesSection />
      </Section>

      {/* Help Section */}
      <Section
        id="help"
        title="We're Here to Help"
        subtitle="SUPPORT"
        className="bg-white"
      >
        <HelpSection />
      </Section>

      {/* Rewards Section */}
      <Section
        id="rewards"
        title="Earn While You Play"
        subtitle="REWARDS"
        className="bg-gray-50"
      >
        <RewardsSection />
      </Section>
    </div>
  );
};

export default Index;