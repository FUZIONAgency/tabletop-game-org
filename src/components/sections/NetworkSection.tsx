import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Trees } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleSponsorRequest } from "@/utils/sponsorRequests";
import { NetworkNode } from "../network/NetworkNode";

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
      
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('id, username')
          .eq('role', 'admin');

        if (error) throw error;
        setAdminProfiles(profiles || []);
      } catch (error) {
        console.error('Error fetching admin profiles:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load admin profiles",
        });
      }
    };

    const fetchActiveSponsor = async () => {
      if (!user) return;

      try {
        const { data: playerData, error: playerError } = await supabase
          .from('players')
          .select('id')
          .eq('auth_id', user.id)
          .maybeSingle();

        if (playerError) throw playerError;
        if (!playerData) return;

        const { data: relationship, error: relationshipError } = await supabase
          .from('player_relationships')
          .select(`
            upline_id,
            players!player_relationships_upline_id_fkey (
              auth_id
            )
          `)
          .eq('downline_id', playerData.id)
          .eq('status', 'active')
          .maybeSingle();

        if (relationshipError) throw relationshipError;
        if (!relationship) return;

        const { data: sponsorProfile, error: sponsorError } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', relationship.players.auth_id)
          .maybeSingle();

        if (sponsorError) throw sponsorError;
        if (sponsorProfile) {
          setActiveSponsor({
            uplineId: relationship.upline_id,
            uplineUsername: sponsorProfile.username
          });
        }
      } catch (error) {
        console.error('Error fetching active sponsor:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load sponsor information",
        });
      }
    };

    fetchNetwork();
    fetchAdminProfiles();
    fetchActiveSponsor();
  }, [user, toast]);

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

  const handleInviteCreated = (invite: any) => {
    console.log('New invite created:', invite);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2">
        <Trees className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Your Network</h3>
      </div>
      <div className="flex justify-center">
        {network && (
          <NetworkNode
            node={network}
            activeSponsor={activeSponsor}
            adminProfiles={adminProfiles}
            onSponsorRequest={onSponsorRequest}
            onInviteCreated={handleInviteCreated}
          />
        )}
      </div>
    </div>
  );
};

export default NetworkSection;