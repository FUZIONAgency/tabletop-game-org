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
    console.log('Index page mounted');
    console.log('Auth state:', { isLoading, user });
  }, [isLoading, user]);

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

  if (isLoading) {
    console.log('Rendering loading state');
    return (
      <div className="min-h-screen bg-white p-6 space-y-8">
        <Navigation />
        <div className="container mx-auto">
          <Skeleton className="h-[60vh] w-full mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  console.log('Rendering full page content');
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow">
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
          className="bg-white -mt-12"
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
      <Footer />
    </div>
  );
};

export default Index;