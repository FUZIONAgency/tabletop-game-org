import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import { useAuth } from "@/contexts/auth";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingState from "@/components/sections/landing/LoadingState";
import LandingSections from "@/components/sections/landing/LandingSections";

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
    return <LoadingState />;
  }

  return (
    <div className="bg-white flex flex-col min-h-screen relative">
      <Navigation />
      <div className="flex-grow relative z-10">
        <HeroSection />
        <LandingSections isAuthenticated={!!user} />
      </div>
    </div>
  );
};

export default Index;