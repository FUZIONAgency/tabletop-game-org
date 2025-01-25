import { ShieldCheck, Award, Star } from "lucide-react";
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

interface QualifyNavProps {
  activeSection: string | null;
  scrollToSection: (id: string) => void;
}

const QualifyNav = ({ activeSection, scrollToSection }: QualifyNavProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleQualifyClick = () => {
    scrollToSection('qualify');
  };

  const qualifyItems = [
    { icon: Award, label: "Get Certified", route: "/qualify/get-certified" },
    { icon: Star, label: "Ratings", route: "/qualify/ratings" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            onClick={handleQualifyClick}
            className={`text-white hover:text-gold bg-transparent hover:bg-transparent focus:bg-transparent focus:text-gold data-[active]:bg-transparent data-[active]:text-gold data-[state=open]:bg-transparent data-[state=open]:text-gold ${
              activeSection === 'qualify' ? 'text-gold' : ''
            }`}
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Qualify
          </NavigationMenuTrigger>
          {user && (
            <NavigationMenuContent>
              <div className="w-[200px] p-2">
                {qualifyItems.map((item) => (
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

export default QualifyNav;