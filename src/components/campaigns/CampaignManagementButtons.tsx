import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const CampaignManagementButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex justify-end">
      <Button
        onClick={() => navigate("/campaigns/new")}
        className="bg-gold hover:bg-yellow-500 text-black"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Game
      </Button>
    </div>
  );
};