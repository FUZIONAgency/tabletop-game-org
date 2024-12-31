import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UnauthenticatedCampaignView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">
        Discover Retailer Games
      </h2>
      <p className="text-gray-600 text-center max-w-md">
        Join our network of tabletop gaming enthusiasts and start playing at local game stores.
      </p>
      <Button 
        className="bg-gold text-black hover:bg-yellow-500 transition-colors"
        size="lg"
        onClick={() => navigate('/auth')}
      >
        <LogIn className="mr-2 h-4 w-4" />
        Get Started
      </Button>
    </div>
  );
};