import { UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface RecruitNavProps {
  activeSection: string | null;
  scrollToSection: (id: string) => void;
}

const RecruitNav = ({ activeSection, scrollToSection }: RecruitNavProps) => {
  const navigate = useNavigate();

  const handleRecruitClick = (e: React.MouseEvent) => {
    scrollToSection('recruiting');
  };

  const networkItems = [
    { icon: Users, label: "Your Network", route: "/network" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            onClick={handleRecruitClick}
            className={`text-white hover:text-gold bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent ${
              activeSection === 'recruiting' ? 'text-gold' : ''
            }`}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Recruit
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[200px] p-2">
              {networkItems.map((item) => (
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

export default RecruitNav;