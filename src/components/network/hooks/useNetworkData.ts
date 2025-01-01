import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NetworkData } from "../types/NetworkTypes";

export const useNetworkData = (userId: string | undefined) => {
  const [networkData, setNetworkData] = useState<Omit<NetworkData, 'refetch'>>({
    network: null,
    adminProfiles: [],
    activeSponsor: null,
    downlines: [],
    hasPendingRequest: false
  });
  const { toast } = useToast();
  const lastFetchTime = useRef<number>(0);
  const THROTTLE_TIME = 2000; // 2 seconds between fetches
  const cache = useRef<{
    data: Omit<NetworkData, 'refetch'> | null;
    timestamp: number;
  }>({ data: null, timestamp: 0 });
  const CACHE_DURATION = 30000; // Cache data for 30 seconds

  const fetchNetwork = useCallback(async () => {
    if (!userId) return;

    const now = Date.now();

    // Check cache first
    if (cache.current.data && now - cache.current.timestamp < CACHE_DURATION) {
      setNetworkData(cache.current.data);
      return;
    }

    // Apply throttling for subsequent requests
    if (lastFetchTime.current !== 0 && now - lastFetchTime.current < THROTTLE_TIME) {
      console.log('Throttling network data fetch');
      return;
    }

    try {
      lastFetchTime.current = now;

      // Get current player's ID
      const { data: playerData, error: playerError } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', userId)
        .maybeSingle();

      if (playerError) {
        throw new Error(`Error fetching player: ${playerError.message}`);
      }

      if (!playerData) {
        toast({
          title: "Profile not found",
          description: "Please try refreshing the page",
          variant: "destructive",
        });
        return;
      }

      // Check for pending sponsor requests
      const { data: pendingRequests, error: pendingError } = await supabase
        .from('player_relationships')
        .select()
        .eq('downline_id', playerData.id)
        .eq('status', 'pending')
        .maybeSingle();

      if (pendingError) {
        console.error('Error checking pending requests:', pendingError);
      }

      // Check for active sponsor
      const { data: activeRelationship, error: relationshipError } = await supabase
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

      if (relationshipError) {
        console.error('Error checking active relationship:', relationshipError);
      }

      // Fetch downlines
      const { data: downlineData, error: downlineError } = await supabase
        .from('player_relationships')
        .select(`
          downline:players!player_relationships_downline_id_fkey (
            id,
            alias
          )
        `)
        .eq('upline_id', playerData.id)
        .eq('status', 'active');

      if (downlineError) {
        console.error('Error fetching downlines:', downlineError);
      }

      // Fetch admin profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('role', 'admin');

      if (profilesError) {
        console.error('Error fetching admin profiles:', profilesError);
      }

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

      const newData = {
        network: mockNetwork,
        adminProfiles: profiles || [],
        activeSponsor,
        downlines: fetchedDownlines,
        hasPendingRequest: !!pendingRequests
      };

      // Update cache
      cache.current = {
        data: newData,
        timestamp: now
      };

      setNetworkData(newData);
    } catch (error) {
      console.error('Error fetching network data:', error);
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Failed to load network data. Please try again later.",
      });
    }
  }, [userId, toast]);

  useEffect(() => {
    fetchNetwork();
  }, [fetchNetwork]);

  const returnData: NetworkData = {
    ...networkData,
    refetch: fetchNetwork
  };

  return returnData;
};