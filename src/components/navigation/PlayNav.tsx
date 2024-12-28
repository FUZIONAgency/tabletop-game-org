import { Dices, Store, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface PlayNavProps {
  activeSection: string | null;
  handlePlayClick: (e: React.MouseEvent) => void;
}

const PlayNav = ({ activeSection, handlePlayClick }: PlayNavProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const playItems = [
    { icon: Store, label: "Retailer Games", route: "/play/retailer" },
    { icon: Users, label: "Convention Games", route: "/play/convention" },
    { icon: Dices, label: "Online Games", route: "/play/online" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            onClick={handlePlayClick}
            className={`text-white hover:text-gold bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent ${
              activeSection === 'games' ? 'text-gold' : ''
            }`}
          >
            <Dices className="w-4 h-4 mr-2" />
            Play
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[200px] p-2">
              {playItems.map((item) => (
                <Button
                  key={item.route}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(item.route)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default PlayNav;