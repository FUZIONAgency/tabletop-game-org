import { useState } from "react";
import { LogIn } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import QualifyNav from "./navigation/QualifyNav";
import PlayNav from "./navigation/PlayNav";
import RecruitNav from "./navigation/RecruitNav";
import EarnNav from "./navigation/EarnNav";
import MobileNav from "./navigation/MobileNav";

const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isMobile = useIsMobile();

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

  const handleEarnClick = (e: React.MouseEvent) => {
    if (isMobile) {
      return;
    }
    e.preventDefault();
    scrollToSection('rewards');
  };

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
            <QualifyNav activeSection={activeSection} scrollToSection={scrollToSection} />
            <PlayNav activeSection={activeSection} handlePlayClick={handlePlayClick} />
            <RecruitNav activeSection={activeSection} handleRecruitClick={handleRecruitClick} />
            <EarnNav activeSection={activeSection} handleEarnClick={handleEarnClick} />
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
            <MobileNav
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              handlePlayClick={handlePlayClick}
              handleRecruitClick={handleRecruitClick}
              handleEarnClick={handleEarnClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;