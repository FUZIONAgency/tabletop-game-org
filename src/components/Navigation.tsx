import { useState } from "react";
import { UserPlus, Dices, DollarSign, Menu, ShieldCheck, LogIn, Store, Users } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const navItems = [
    { id: "qualify", icon: ShieldCheck, label: "Qualify", subtitle: "Become certified on each game system" },
    { id: "rewards", icon: DollarSign, label: "Earn", subtitle: "Earn While You Play" },
  ];

  const playItems = [
    { icon: Store, label: "Retailer Games", route: "/play/retailer" },
    { icon: Users, label: "Convention Games", route: "/play/convention" },
    { icon: Dices, label: "Online Games", route: "/play/online" },
  ];

  const networkItems = [
    { icon: Users, label: "Your Network", route: "/network" },
  ];

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(id);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    if (isMobile) {
      return;
    }
    e.preventDefault();
    scrollToSection('games');
  };

  const handleRecruitClick = (e: React.MouseEvent) => {
    if (isMobile) {
      return;
    }
    e.preventDefault();
    scrollToSection('recruiting');
  };

  const NavLinks = () => (
    <>
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={`flex items-center space-x-2 transition-colors w-full p-2 text-white hover:text-gold ${
            activeSection === id ? 'text-gold' : ''
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
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
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-white hover:text-gold transition-colors"
          >
            TabletopGame.org
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="ml-4">
              {user ? (
                <ProfileMenu />
              ) : (
                <Button
                  variant="ghost"
                  className="text-white hover:text-gold"
                  onClick={() => navigate('/auth')}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <div className="mr-2">
              {user ? (
                <ProfileMenu />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-gold"
                  onClick={() => navigate('/auth')}
                >
                  <LogIn className="h-4 w-4" />
                  <span className="sr-only">Login</span>
                </Button>
              )}
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 text-white hover:text-gold"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;