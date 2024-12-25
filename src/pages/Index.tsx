import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import Section from "@/components/Section";
import SignUpSection from "@/components/sections/SignUpSection";
import GamesSection from "@/components/sections/GamesSection";
import RecruitingSection from "@/components/sections/RecruitingSection";
import RewardsSection from "@/components/sections/RewardsSection";
import MyPlayerSection from "@/components/sections/MyPlayerSection";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { isLoading, role, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6 space-y-8">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-[60vh] w-full" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Navigation />
      <HeroSection />
      
      {/* Qualify Section */}
      <Section
        id="qualify"
        title="Get Certified"
        subtitle="QUALIFICATION"
        className="bg-gray-50"
      >
        {user ? <MyPlayerSection /> : <SignUpSection />}
      </Section>

      {/* Games Section */}
      <Section
        id="games"
        title="Play Anywhere, Anytime"
        subtitle="GAMES"
        className="bg-white"
      >
        <GamesSection />
      </Section>

      {/* Recruiting Section */}
      <Section
        id="recruiting"
        title="Build Your Team"
        subtitle="RECRUITING"
        className="bg-gray-50"
      >
        <RecruitingSection />
      </Section>

      {/* Rewards Section */}
      <Section
        id="rewards"
        title="Get Paid to Play"
        subtitle="REWARDS"
        className="bg-white"
      >
        <RewardsSection />
      </Section>
    </div>
  );
};

export default Index;