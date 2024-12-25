import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import Section from "@/components/Section";
import SignUpSection from "@/components/sections/SignUpSection";
import GamesSection from "@/components/sections/GamesSection";
import HelpSection from "@/components/sections/HelpSection";
import RewardsSection from "@/components/sections/RewardsSection";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

const Index = () => {
  const { isLoading, role, user } = useAuth();

  useEffect(() => {
    console.log("Index component mounted");
    console.log("Auth loading state:", isLoading);
    console.log("Current role:", role);
    console.log("Current user:", user?.id);
  }, [isLoading, role, user]);

  if (isLoading) {
    console.log("Rendering loading skeleton...");
    return (
      <div className="min-h-screen bg-white p-6 space-y-8">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-[60vh] w-full" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  console.log("Rendering full content...");
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