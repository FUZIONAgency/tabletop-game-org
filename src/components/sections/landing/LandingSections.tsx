import Section from "@/components/Section";
import SignUpSection from "@/components/sections/SignUpSection";
import GamesSection from "@/components/sections/GamesSection";
import RecruitingSection from "@/components/sections/RecruitingSection";
import RewardsSection from "@/components/sections/RewardsSection";
import MyPlayerSection from "@/components/sections/MyPlayerSection";

interface LandingSectionsProps {
  isAuthenticated: boolean;
}

const LandingSections = ({ isAuthenticated }: LandingSectionsProps) => {
  return (
    <>
      {/* Qualify Section */}
      <div className="landing-section-wrapper">
        <Section
          id="qualify"
          title="Get Certified"
          subtitle="QUALIFICATION"
          className="bg-gray-50 relative z-10"
        >
          {isAuthenticated ? <MyPlayerSection /> : <SignUpSection />}
        </Section>
      </div>

      {/* Games Section */}
      <div className="landing-section-wrapper">
        <Section
          id="games"
          title="Play Anywhere, Anytime"
          subtitle="GAMES"
          className="bg-white relative z-10"
        >
          <GamesSection />
        </Section>
      </div>

      {/* Recruiting Section */}
      <div className="landing-section-wrapper">
        <Section
          id="recruiting"
          title="Build Your Team"
          subtitle="RECRUITING"
          className="bg-gray-50 relative z-10"
        >
          <RecruitingSection />
        </Section>
      </div>

      {/* Rewards Section */}
      <div className="landing-section-wrapper">
        <Section
          id="rewards"
          title="Get Paid to Play"
          subtitle="REWARDS"
          className="bg-white relative z-10"
        >
          <RewardsSection />
        </Section>
      </div>
    </>
  );
};

export default LandingSections;