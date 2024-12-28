import { DollarSign, Percent, GamepadIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface EarnNavProps {
  activeSection: string | null;
  handleEarnClick: (e: React.MouseEvent) => void;
}

const EarnNav = ({ activeSection, handleEarnClick }: EarnNavProps) => {
  const navigate = useNavigate();

  const earnItems = [
    { icon: DollarSign, label: "Product Sales", route: "/earn/product-sales" },
    { icon: Percent, label: "Overrides", route: "/earn/overrides" },
    { icon: Percent, label: "Convention Sales", route: "/earn/convention-sales" },
    { icon: DollarSign, label: "Retailer Sales", route: "/earn/retailer-sales" },
    { icon: GamepadIcon, label: "Paid Games", route: "/earn/paid-games" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            onClick={handleEarnClick}
            className={`text-white hover:text-gold bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent ${
              activeSection === 'rewards' ? 'text-gold' : ''
            }`}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Earn
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[200px] p-2">
              {earnItems.map((item) => (
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

export default EarnNav;