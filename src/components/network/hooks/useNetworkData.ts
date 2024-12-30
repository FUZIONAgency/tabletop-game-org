import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NetworkData } from "../types/NetworkTypes";

export const useNetworkData = (userId: string | undefined) => {
  const [networkData, setNetworkData] = useState<NetworkData>({
    network: null,
    adminProfiles: [],
    activeSponsor: null,
    downlines: [],
    hasPendingRequest: false
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchNetwork = async () => {
      if (!userId) return;

      try {
        // Get current player's ID
        const { data: playerData } = await supabase
          .from('players')
          .select('id')
          .eq('auth_id', userId)
          .single();

        if (!playerData) return;

        // Check for pending sponsor requests
        const { data: pendingRequests } = await supabase
          .from('player_relationships')
          .select()
          .eq('downline_id', playerData.id)
          .eq('status', 'pending')
          .maybeSingle();

        // Check for active sponsor
        const { data: activeRelationship } = await supabase
          .from('player_relationships')
          .select(`
            upline:players!player_relationships_upline_id_fkey (
              id,
              alias
            )
          `)
          .eq('downline_id', playerData.id)
          .eq('status', 'active')
          .maybeSingle();

        // Fetch downlines
        const { data: downlineData } = await supabase
          .from('player_relationships')
          .select(`
            downline:players!player_relationships_downline_id_fkey (
              id,
              alias
            )
          `)
          .eq('upline_id', playerData.id)
          .eq('status', 'active');

        // Fetch admin profiles
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, username')
          .eq('role', 'admin');

        const fetchedDownlines = downlineData?.map(d => ({
          id: d.downline.id,
          alias: d.downline.alias
        })) || [];

        const activeSponsor = activeRelationship ? {
          uplineId: activeRelationship.upline.id,
          uplineUsername: activeRelationship.upline.alias
        } : null;

        // Create network structure
        const mockNetwork = {
          id: "sponsor",
          alias: pendingRequests ? "In Review" : "Request a Sponsor",
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
                ...fetchedDownlines.map(downline => ({
                  id: downline.id,
                  alias: downline.alias,
                  children: [],
                })),
                {
                  id: "right",
                  alias: "New Invite",
                  children: [],
                },
              ],
            },
          ],
        };

        setNetworkData({
          network: mockNetwork,
          adminProfiles: profiles || [],
          activeSponsor,
          downlines: fetchedDownlines,
          hasPendingRequest: !!pendingRequests
        });
      } catch (error) {
        console.error('Error fetching network data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load network data",
        });
      }
    };

    fetchNetwork();
  }, [userId, toast]);

  return networkData;
};