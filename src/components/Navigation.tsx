import { useState, useEffect } from "react";
import { UserPlus, Dices, DollarSign, Menu, ShieldCheck } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { id: "qualify", icon: ShieldCheck, label: "Qualify", subtitle: "Become certified on each game system" },
    { id: "games", icon: Dices, label: "Play", subtitle: "Play Anywhere, Anytime" },
    { id: "recruiting", icon: UserPlus, label: "Recruit", subtitle: "Build Your Team" },
    { id: "rewards", icon: DollarSign, label: "Earn", subtitle: "Earn While You Play" },
  ];

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

  const NavLinks = () => (
    <>
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="flex items-center space-x-2 transition-colors w-full p-2 text-white hover:text-gold"
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
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