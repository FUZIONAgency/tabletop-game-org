import { DollarSign, Percent, Dices, BaggageClaim, EarthLock, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/auth";

interface EarnNavProps {
  activeSection: string | null;
  scrollToSection: (id: string) => void;
}

const EarnNav = ({ activeSection, scrollToSection }: EarnNavProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEarnClick = (e: React.MouseEvent) => {
    scrollToSection('rewards');
  };

  const earnItems = [
    { icon: BaggageClaim, label: "Product Sales", route: "/earn/product-sales" },
    { icon: Percent, label: "Overrides", route: "/earn/overrides" },
    { icon: EarthLock, label: "Convention Sales", route: "/earn/convention-sales" },
    { icon: Store, label: "Retailer Sales", route: "/earn/retailer-sales" },
    { icon: Dices, label: "Paid Games", route: "/earn/paid-games" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            onClick={handleEarnClick}
            className={`text-white hover:text-gold bg-transparent hover:bg-transparent focus:bg-transparent focus:text-gold data-[active]:bg-transparent data-[active]:text-gold data-[state=open]:bg-transparent data-[state=open]:text-gold ${
              activeSection === 'rewards' ? 'text-gold' : ''
            }`}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Earn
          </NavigationMenuTrigger>
          {user && (
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
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default EarnNav;