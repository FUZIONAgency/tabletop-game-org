import { LogOut, User, Gamepad, Store, Trophy, Tent, Package, Users, TestTube, DollarSign, Gift, Box, Settings, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

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

  const menuItems = [
    { label: "My Profile", icon: User, path: "/my/profile" },
    { label: "My Game Systems", icon: Gamepad, path: "/my/game_systems" },
    { label: "My Retailers", icon: Store, path: "/my/retailers" },
    { label: "My Tournaments", icon: Trophy, path: "/my/tournaments" },
    { label: "My Conventions", icon: Tent, path: "/my/conventions" },
    { label: "My Products", icon: Package, path: "/my/products" },
    { label: "My Team", icon: Users, path: "/my/network" },
    { label: "My Exams", icon: TestTube, path: "/my/exams" },
    { label: "My Earnings", icon: DollarSign, path: "/my/earnings" },
    { label: "My Purchases", icon: ShoppingCart, path: "/my/purchases" },
    { label: "My Fundraisers", icon: Gift, path: "/my/fundraisers" },
    { label: "My Inventory", icon: Box, path: "/my/inventory" },
    { label: "My Equipment", icon: Settings, path: "/my/equipment" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <User className="h-4 w-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">My Account</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.path}
            className="cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;