import { useState, useEffect } from "react";
import { UserPlus, Dices, HelpCircle, DollarSign, Network, Menu } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    ...(user ? [{ id: "network", icon: Network, label: "Your Network", href: "/network" }] : []),
    ...(user ? [] : [{ id: "signup", icon: UserPlus, label: "Sign Up" }]),
    { id: "games", icon: Dices, label: "Play Games" },
    { id: "help", icon: HelpCircle, label: "Find Help" },
    { id: "rewards", icon: DollarSign, label: "Get Paid" },
  ];

  const NavLinks = () => (
    <>
      {navItems.map(({ id, icon: Icon, label, href }) => (
        href ? (
          <Link
            key={id}
            to={href}
            className={`flex items-center space-x-2 transition-colors p-2 ${
              scrolled || !isHomePage
                ? "text-gray-300 hover:text-white"
                : "text-white hover:text-[#C8C8C9]"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </Link>
        ) : (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`flex items-center space-x-2 transition-colors w-full p-2 ${
              scrolled || !isHomePage
                ? "text-gray-300 hover:text-white"
                : "text-white hover:text-[#C8C8C9]"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        )
      ))}
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-900/80"
            : "bg-transparent"
          : "bg-black"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className={`text-xl font-bold transition-colors ${
              isHomePage && !scrolled
                ? "text-white hover:text-gray-200"
                : "text-white hover:text-gray-300"
            }`}
          >
            TabletopGame.org
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="ml-4">
              <ProfileMenu />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <div className="mr-2">
              <ProfileMenu />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-10 w-10 ${
                    isHomePage && !scrolled
                      ? "text-white"
                      : "text-white"
                  }`}
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