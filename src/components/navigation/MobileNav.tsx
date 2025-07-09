import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
  MapPin,
  Award,
  Star,
  Dices,
  UserPlus,
  Percent,
  BaggageClaim,
  EarthLock,
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
    { label: "My Visits", icon: MapPin, path: "/my/visits" },
    { label: "My Games", icon: Gamepad, path: "/my/games" },
    { label: "My Game Systems", icon: Gamepad, path: "/my/gamesystems" },
    { label: "My Retailers", icon: Store, path: "/my/retailers" },
    { label: "My Conventions", icon: Tent, path: "/my/conventions" },
    { label: "My Products", icon: Package, path: "/my/products" },
    { label: "My Team", icon: Users, path: "/my/network" },
    { label: "My Exams", icon: TestTube, path: "/my/exams" },
    { label: "My Points", icon: Star, path: "/my/earnings" },
    { label: "My Fundraisers", icon: Gift, path: "/my/fundraisers" },
    { label: "Logout", icon: LogOut, onClick: handleLogout },
  ];

  const [open, setOpen] = useState(false);

  const handleNavClick = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
          <div className="text-black space-y-2">
            {/* Main Navigation Items */}
            
            {/* Qualify Section */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-6 text-black hover:bg-gray-100 text-lg font-semibold"
                onClick={() => handleNavClick(() => scrollToSection('qualify'))}
              >
                <TestTube className="h-6 w-6" />
                Qualify
              </Button>
              {user && (
                <div className="ml-10 space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/qualify/get-certified'))}
                  >
                    <Award className="h-4 w-4" />
                    Get Certified
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/qualify/ratings'))}
                  >
                    <Star className="h-4 w-4" />
                    Ratings
                  </Button>
                </div>
              )}
            </div>

            {/* Play Section */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-6 text-black hover:bg-gray-100 text-lg font-semibold"
                onClick={() => handleNavClick(() => scrollToSection('games'))}
              >
                <Gamepad className="h-6 w-6" />
                Play
              </Button>
              {user && (
                <div className="ml-10 space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/play/retailer'))}
                  >
                    <Store className="h-4 w-4" />
                    Retailer Games
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/play/convention'))}
                  >
                    <Users className="h-4 w-4" />
                    Convention Games
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/play/online'))}
                  >
                    <Dices className="h-4 w-4" />
                    Online Games
                  </Button>
                </div>
              )}
            </div>

            {/* Recruit Section */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-6 text-black hover:bg-gray-100 text-lg font-semibold"
                onClick={() => handleNavClick(() => scrollToSection('recruiting'))}
              >
                <UserPlus className="h-6 w-6" />
                Recruit
              </Button>
              {user && (
                <div className="ml-10 space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/my/network'))}
                  >
                    <Users className="h-4 w-4" />
                    Your Network
                  </Button>
                </div>
              )}
            </div>

            {/* Earn Section */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-6 text-black hover:bg-gray-100 text-lg font-semibold"
                onClick={() => handleNavClick(() => scrollToSection('rewards'))}
              >
                <DollarSign className="h-6 w-6" />
                Earn
              </Button>
              {user && (
                <div className="ml-10 space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/earn/product-sales'))}
                  >
                    <BaggageClaim className="h-4 w-4" />
                    Product Sales
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/earn/overrides'))}
                  >
                    <Percent className="h-4 w-4" />
                    Overrides
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/earn/convention-sales'))}
                  >
                    <EarthLock className="h-4 w-4" />
                    Convention Sales
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/earn/retailer-sales'))}
                  >
                    <Store className="h-4 w-4" />
                    Retailer Sales
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(() => navigate('/earn/paid-games'))}
                  >
                    <Dices className="h-4 w-4" />
                    Paid Games
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            {user ? (
              <>
                {profileMenuItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-4 text-black hover:bg-gray-100 text-base"
                    onClick={() => handleNavClick(item.onClick || (() => navigate(item.path)))}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
              </>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-4 text-black hover:bg-gray-100 text-base"
                onClick={() => handleNavClick(() => navigate('/auth'))}
              >
                <LogIn className="h-5 w-5" />
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