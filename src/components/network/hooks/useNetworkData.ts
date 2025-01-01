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

        // Get relationships from local storage or fetch if not available
        let relationships = [];
        const storedRelationships = localStorage.getItem('user_relationships');
        
        if (!storedRelationships) {
          const { data: relationshipsData } = await supabase
            .from('player_relationships')
            .select('*');
          
          if (relationshipsData) {
            relationships = relationshipsData;
            localStorage.setItem('user_relationships', JSON.stringify(relationshipsData));
          }
        } else {
          relationships = JSON.parse(storedRelationships);
        }

        // Check for pending requests where player is upline
        const pendingRequests = relationships.find(
          (r: any) => r.upline_id === playerData.id && r.status === 'pending'
        );

        // Check for active sponsor
        const activeRelationship = relationships.find(
          (r: any) => r.downline_id === playerData.id && r.status === 'active'
        );

        // Get downlines
        const downlineData = relationships.filter(
          (r: any) => r.upline_id === playerData.id && r.status === 'active'
        );

        // Fetch admin profiles
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, username')
          .eq('role', 'admin');

        // Get active sponsor details if exists
        let activeSponsor = null;
        if (activeRelationship) {
          const { data: sponsorData } = await supabase
            .from('players')
            .select('id, alias')
            .eq('id', activeRelationship.upline_id)
            .single();

          if (sponsorData) {
            activeSponsor = {
              uplineId: sponsorData.id,
              uplineUsername: sponsorData.alias
            };
          }
        }

        // Get downline details
        const fetchedDownlines = [];
        for (const relationship of downlineData) {
          const { data: downlinePlayer } = await supabase
            .from('players')
            .select('id, alias')
            .eq('id', relationship.downline_id)
            .single();

          if (downlinePlayer) {
            fetchedDownlines.push({
              id: downlinePlayer.id,
              alias: downlinePlayer.alias
            });
          }
        }

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