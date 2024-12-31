import { Button } from "@/components/ui/button";
import { Store, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CampaignManagementButtons = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6 flex justify-between items-center">
      <Button
        onClick={() => navigate('/my/retailers')}
        className="bg-gold hover:bg-yellow-500 text-black"
      >
        <Store className="mr-2 h-4 w-4" />
        Link a Retailer
      </Button>
      
      <Button
        onClick={() => navigate('/my/games')}
        className="bg-gold hover:bg-yellow-500 text-black"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a Game
      </Button>
    </div>
  );
};