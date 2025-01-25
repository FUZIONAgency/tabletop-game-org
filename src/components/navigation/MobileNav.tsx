import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import QualifyNav from "./QualifyNav";
import PlayNav from "./PlayNav";
import RecruitNav from "./RecruitNav";
import EarnNav from "./EarnNav";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  User,
  Gamepad,
  Store,
  Tent,
  Package,
  Users,
  LogOut,
  TestTube,
  DollarSign,
  Gift,
  Box,
  Settings,
  LogIn,
} from "lucide-react";

interface MobileNavProps {
  activeSection: string | null;
  scrollToSection: (id: string) => void;
}

const MobileNav = ({
  activeSection,
  scrollToSection,
}: MobileNavProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  const profileMenuItems = [
    { label: "My Profile", icon: User, path: "/my/profile" },
    { label: "My Games", icon: Gamepad, path: "/my/games" },
    { label: "My Game Systems", icon: Gamepad, path: "/my/gamesystems" },
    { label: "My Retailers", icon: Store, path: "/my/retailers" },
    { label: "My Conventions", icon: Tent, path: "/my/conventions" },
    { label: "My Products", icon: Package, path: "/my/products" },
    { label: "My Team", icon: Users, path: "/my/network" },
    { label: "My Exams", icon: TestTube, path: "/my/exams" },
    { label: "My Earnings", icon: DollarSign, path: "/my/earnings" },
    { label: "My Fundraisers", icon: Gift, path: "/my/fundraisers" },
    { label: "Logout", icon: LogOut, onClick: handleLogout },
  ];

  return (
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
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
        <nav className="flex flex-col gap-4 mt-8">
          <div className="text-black">
            <QualifyNav activeSection={activeSection} scrollToSection={scrollToSection} />
            <PlayNav activeSection={activeSection} scrollToSection={scrollToSection} />
            <RecruitNav activeSection={activeSection} scrollToSection={scrollToSection} />
            <EarnNav activeSection={activeSection} scrollToSection={scrollToSection} />
          </div>
          
          <div className="border-t pt-4 mt-4">
            {user ? (
              <>
                {profileMenuItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 text-black hover:bg-gray-100"
                    onClick={item.onClick || (() => navigate(item.path))}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 px-2 text-black hover:bg-gray-100"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;