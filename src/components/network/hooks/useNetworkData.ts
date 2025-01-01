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
        const { data: playerData, error: playerError } = await supabase
          .from('players')
          .select('id')
          .eq('auth_id', userId)
          .single();

        if (playerError) {
          console.error('Error fetching player:', playerError);
          return;
        }

        if (!playerData) {
          console.log('No player data found');
          return;
        }

        // Get relationships from local storage or fetch if not available
        let relationships = [];
        const storedRelationships = localStorage.getItem('user_relationships');
        
        if (!storedRelationships) {
          const { data: relationshipsData, error: relationshipsError } = await supabase
            .from('player_relationships')
            .select('*');
          
          if (relationshipsError) {
            console.error('Error fetching relationships:', relationshipsError);
            relationships = [];
          } else if (relationshipsData) {
            relationships = relationshipsData;
            localStorage.setItem('user_relationships', JSON.stringify(relationshipsData));
          }
        } else {
          try {
            relationships = JSON.parse(storedRelationships);
          } catch (error) {
            console.error('Error parsing stored relationships:', error);
            relationships = [];
            localStorage.removeItem('user_relationships');
          }
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
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, username')
          .eq('role', 'admin');

        if (profilesError) {
          console.error('Error fetching admin profiles:', profilesError);
          return;
        }

        // Get active sponsor details if exists
        let activeSponsor = null;
        if (activeRelationship) {
          const { data: sponsorData, error: sponsorError } = await supabase
            .from('players')
            .select('id, alias')
            .eq('id', activeRelationship.upline_id)
            .single();

          if (sponsorError) {
            console.error('Error fetching sponsor:', sponsorError);
          } else if (sponsorData) {
            activeSponsor = {
              uplineId: sponsorData.id,
              uplineUsername: sponsorData.alias
            };
          }
        }

        // Get downline details
        const fetchedDownlines = [];
        for (const relationship of downlineData) {
          const { data: downlinePlayer, error: downlineError } = await supabase
            .from('players')
            .select('id, alias')
            .eq('id', relationship.downline_id)
            .single();

          if (downlineError) {
            console.error('Error fetching downline:', downlineError);
            continue;
          }

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