import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import Section from "@/components/Section";
import SignUpSection from "@/components/sections/SignUpSection";
import GamesSection from "@/components/sections/GamesSection";
import RecruitingSection from "@/components/sections/RecruitingSection";
import RewardsSection from "@/components/sections/RewardsSection";
import MyPlayerSection from "@/components/sections/MyPlayerSection";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { isLoading, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.state]);

  useEffect(() => {
    console.log("Auth state:", { isLoading, user });
  }, [isLoading, user]);

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
    <div className="bg-white flex flex-col min-h-screen relative">
      <Navigation />
      <div className="flex-grow relative z-10">
        <HeroSection />
        
        {/* Qualify Section */}
        <Section
          id="qualify"
          title="Get Certified"
          subtitle="QUALIFICATION"
          className="bg-gray-50 relative z-10"
        >
          {user ? (
            <MyPlayerSection />
          ) : (
            <SignUpSection />
          )}
        </Section>

        {/* Games Section */}
        <Section
          id="games"
          title="Play Anywhere, Anytime"
          subtitle="GAMES"
          className="bg-white relative z-10"
        >
          <GamesSection />
        </Section>

        {/* Recruiting Section */}
        <Section
          id="recruiting"
          title="Build Your Team"
          subtitle="RECRUITING"
          className="bg-gray-50 relative z-10"
        >
          <RecruitingSection />
        </Section>

        {/* Rewards Section */}
        <Section
          id="rewards"
          title="Get Paid to Play"
          subtitle="REWARDS"
          className="bg-white relative z-10"
        >
          <RewardsSection />
        </Section>
      </div>
      <Footer />
    </div>
  );
};

export default Index;