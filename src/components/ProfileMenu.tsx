import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth";
import {
  User,
  Gamepad,
  Store,
  Trophy,
  Tent,
  Package,
  Users,
  LogOut,
  TestTube,
  DollarSign,
  Gift,
  Box,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProfileMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // First clear any local state/storage if needed
      localStorage.removeItem('supabase.auth.token');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        // Still navigate to auth page even if there's an error
        navigate('/auth');
        toast.error("There was an issue logging out, but you've been redirected to the login page");
        return;
      }
      
      navigate('/auth');
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in logout process:", error);
      // Still navigate to auth page even if there's an error
      navigate('/auth');
      toast.error("There was an issue logging out, but you've been redirected to the login page");
    }
  };

  const menuItems = [
    { label: "My Profile", icon: User, path: "/my/profile" },
    { label: "My Games", icon: Gamepad, path: "/my/games" },
    { label: "My Retailers", icon: Store, path: "/my/retailers" },
    { label: "My Tournaments", icon: Trophy, path: "/my/tournaments" },
    { label: "My Conventions", icon: Tent, path: "/my/conventions" },
    { label: "My Products", icon: Package, path: "/my/products" },
    { label: "My Team", icon: Users, path: "/my/network" },
    { label: "My Exams", icon: TestTube, path: "/my/exams" },
    { label: "My Earnings", icon: DollarSign, path: "/my/earnings" },
    { label: "My Fundraisers", icon: Gift, path: "/my/fundraisers" },
    { label: "My Inventory", icon: Box, path: "/my/inventory" },
    { label: "My Equipment", icon: Settings, path: "/my/equipment" },
    { label: "Logout", icon: LogOut, onClick: handleLogout },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8 hover:ring-2 hover:ring-gold transition-all">
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-gold text-black">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            className="flex items-center gap-2 cursor-pointer"
            onClick={item.onClick || (() => navigate(item.path))}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;