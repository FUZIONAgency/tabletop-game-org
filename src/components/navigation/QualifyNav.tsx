import { ShieldCheck, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";
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

interface QualifyNavProps {
  activeSection: string | null;
  scrollToSection: (id: string) => void;
}

const QualifyNav = ({ activeSection, scrollToSection }: QualifyNavProps) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const handleQualifyClick = () => {
    if (!isMobile) {
      scrollToSection('qualify');
    }
  };

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
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/qualify/get-certified" className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Get Certified</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/qualify/ratings" className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Ratings</span>
                  </Link>
                </Button>
              </div>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default QualifyNav;