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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ProfileMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { label: "My Profile", icon: User, path: "/profile" },
    { label: "My Games", icon: Gamepad, path: "/games" },
    { label: "My Retailers", icon: Store, path: "/retailers" },
    { label: "My Tournaments", icon: Trophy, path: "/tournaments" },
    { label: "My Conventions", icon: Tent, path: "/conventions" },
    { label: "My Products", icon: Package, path: "/products" },
    { label: "My Team", icon: Users, path: "/network" },
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