import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NetworkData } from "../types/NetworkTypes";
import { usePlayerData } from "./usePlayerData";
import { useRelationshipsData } from "./useRelationshipsData";
import { useAdminProfiles } from "./useAdminProfiles";
import { useDownlineData } from "./useDownlineData";

export const useNetworkData = (userId: string | undefined) => {
  const [networkData, setNetworkData] = useState<NetworkData>({
    network: null,
    adminProfiles: [],
    activeSponsor: null,
    downlines: [],
    hasPendingRequest: false
  });
  const { toast } = useToast();

  const playerId = usePlayerData(userId);
  const relationships = useRelationshipsData(playerId);
  const adminProfiles = useAdminProfiles();
  const downlines = useDownlineData(relationships, playerId);

  useEffect(() => {
    const buildNetworkData = async () => {
      if (!playerId) return;

      try {
        // Check for pending requests where player is upline
        const pendingRequests = relationships.find(
          (r: any) => r.upline_id === playerId && r.status === 'pending'
        );

        // Check for active sponsor
        const activeRelationship = relationships.find(
          (r: any) => r.downline_id === playerId && r.status === 'active'
        );

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
                ...downlines.map(downline => ({
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
          adminProfiles,
          activeSponsor,
          downlines,
          hasPendingRequest: !!pendingRequests
        });
      } catch (error) {
        console.error('Error building network data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load network data",
        });
      }
    };

    buildNetworkData();
  }, [playerId, relationships, adminProfiles, downlines, toast]);

  return networkData;
};