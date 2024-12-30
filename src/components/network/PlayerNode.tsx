import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface PlayerNodeProps {
  isRoot?: boolean;
  isDownline?: boolean;
  alias?: string;
}

export const PlayerNode = ({ isRoot, isDownline, alias }: PlayerNodeProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isRoot) {
      navigate("/my/profile");
    }
  };

  return (
    <Card 
      className={`p-4 mb-4 w-32 text-center ${
        isRoot ? "bg-white hover:bg-gold cursor-pointer" : 
        isDownline ? "bg-[#1A1F2C] text-white" : "bg-white"
      }`}
      onClick={handleClick}
    >
      <p className="font-medium">
        {isRoot ? "You" : isDownline ? alias : "Player"}
      </p>
    </Card>
  );
};