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
import { useAuth } from "@/contexts/auth";

interface PlayNavProps {
  activeSection: string | null;
  scrollToSection: (id: string) => void;
}

const PlayNav = ({ activeSection, scrollToSection }: PlayNavProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const handlePlayClick = (e: React.MouseEvent) => {
    scrollToSection('games');
  };

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
            className={`text-white hover:text-gold bg-transparent hover:bg-transparent focus:bg-transparent focus:text-gold data-[active]:bg-transparent data-[active]:text-gold data-[state=open]:bg-transparent data-[state=open]:text-gold ${
              activeSection === 'games' ? 'text-gold' : ''
            }`}
          >
            <Dices className="w-4 h-4 mr-2" />
            Play
          </NavigationMenuTrigger>
          {user && (
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
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default PlayNav;