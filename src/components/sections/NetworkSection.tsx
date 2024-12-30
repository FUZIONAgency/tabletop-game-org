import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Trees, Plus, Link2 } from "lucide-react";
import { Card } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import { handleSponsorRequest } from "@/utils/sponsorRequests";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NetworkNode {
  id: string;
  alias: string;
  children: NetworkNode[];
}

interface AdminProfile {
  id: string;
  username: string;
}

interface ActiveSponsor {
  uplineId: string;
  uplineUsername: string;
}

const NetworkSection = () => {
  const [network, setNetwork] = useState<NetworkNode | null>(null);
  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>([]);
  const [activeSponsor, setActiveSponsor] = useState<ActiveSponsor | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchNetwork = async () => {
      // This is a placeholder - implement actual network fetching logic
      const mockNetwork = {
        id: "sponsor",
        alias: "Request a Sponsor",
        children: [
          {
            id: "root",
            alias: "You",
            children: [
              {
                id: "left",
                alias: "New Invite",
                children: [],
              },
              {
                id: "right",
                alias: "New Invite",
                children: [],
              },
            ],
          },
        ],
      };
      setNetwork(mockNetwork);
    };

    const fetchAdminProfiles = async () => {
      if (!user) return;
      
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('role', 'admin')
        .neq('id', user.id); // Exclude the current user

      if (error) {
        console.error('Error fetching admin profiles:', error);
        return;
      }

      setAdminProfiles(profiles || []);
    };

    const fetchActiveSponsor = async () => {
      if (!user) return;

      // First get the current player's ID
      const { data: playerData } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', user.id)
        .single();

      if (!playerData) return;

      // Then fetch the active sponsor relationship
      const { data: relationship } = await supabase
        .from('player_relationships')
        .select(`
          upline_id,
          players!player_relationships_upline_id_fkey (
            auth_id
          )
        `)
        .eq('downline_id', playerData.id)
        .eq('status', 'active')
        .single();

      if (relationship) {
        // Get the sponsor's username from profiles
        const { data: sponsorProfile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', relationship.players.auth_id)
          .single();

        if (sponsorProfile) {
          setActiveSponsor({
            uplineId: relationship.upline_id,
            uplineUsername: sponsorProfile.username
          });
        }
      }
    };

    fetchNetwork();
    fetchAdminProfiles();
    fetchActiveSponsor();
  }, [user]);

  const onSponsorRequest = async (adminProfileId: string) => {
    try {
      await handleSponsorRequest(adminProfileId, user);
      
      toast({
        title: "Success",
        description: "Sponsor request sent successfully",
      });
    } catch (error) {
      console.error('Error requesting sponsor:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send sponsor request",
        variant: "destructive",
      });
    }
  };

  const renderNode = (node: NetworkNode) => {
    return (
      <div key={node.id} className="flex flex-col items-center relative">
        <Card className={`p-4 mb-4 w-32 text-center relative z-10 ${
          node.id === "sponsor" && activeSponsor 
            ? "bg-forest-green text-white hover:bg-forest-green/90" 
            : "bg-white hover:bg-yellow-100"
        } transition-colors duration-200`}>
          {node.id === "sponsor" ? (
            activeSponsor ? (
              <div className="flex items-center justify-center gap-1">
                <Trees className="h-4 w-4" />
                {activeSponsor.uplineUsername}
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center gap-1 text-primary hover:text-primary/80">
                  <Link2 className="h-4 w-4" />
                  {node.alias}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {adminProfiles.map((profile) => (
                    <DropdownMenuItem
                      key={profile.id}
                      onClick={() => onSponsorRequest(profile.id)}
                    >
                      {profile.username}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          ) : node.id === "left" || node.id === "right" ? (
            <a href="#" className="flex items-center justify-center gap-1 text-primary hover:text-primary/80">
              <Plus className="h-4 w-4" />
              {node.alias}
            </a>
          ) : (
            <p className="font-medium">{node.alias}</p>
          )}
        </Card>
        {node.children.length > 0 && (
          <>
            <div className="w-[2px] h-8 border-l-2 border-dashed border-gray-300" />
            <div className="flex gap-8 mt-4 relative">
              {node.children.length > 1 && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 h-[2px] border-t-2 border-dashed border-gray-300" 
                  style={{ width: 'calc(100% - 2rem)' }} 
                />
              )}
              {node.children.map((child) => renderNode(child))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2">
        <Trees className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Your Network</h3>
      </div>
      <div className="flex justify-center">
        {network && renderNode(network)}
      </div>
    </div>
  );
};

export default NetworkSection;