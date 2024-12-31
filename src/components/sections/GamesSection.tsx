import { Store, Users, Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const GamesSection = () => {
  const navigate = useNavigate();

  const gameOptions = [
    {
      title: "Retailers",
      description: "Play at your local retailer",
      icon: Store,
      route: "/play/retailer"
    },
    {
      title: "Conventions",
      description: "Host games at conventions",
      icon: Users,
      route: "/play/convention"
    },
    {
      title: "Online",
      description: "Host online games",
      icon: Dices,
      route: "/play/online"
    }
  ];

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {gameOptions.map((item, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => handleCardClick(item.route)}
        >
          <item.icon className="w-12 h-12 mb-6 text-gold" />
          <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default GamesSection;