import { Trees } from "lucide-react";
import { NetworkTree } from "../network/NetworkTree";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NetworkSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <div className="flex items-center justify-center gap-2">
          <Trees className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Your Network</h3>
        </div>
        <Button 
          variant="default" 
          className="bg-gold hover:bg-gold/90 text-black"
          onClick={() => navigate('/auth')}
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2">
        <Trees className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Your Network</h3>
      </div>
      <div className="flex justify-center">
        <NetworkTree />
      </div>
    </div>
  );
};

export default NetworkSection;