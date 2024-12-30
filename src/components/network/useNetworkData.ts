import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminProfile, ActiveSponsor, Downline, NetworkData } from './types';
import { User } from '@supabase/supabase-js';

export const useNetworkData = (user: User | null) => {
  const [network, setNetwork] = useState<NetworkData | null>(null);
  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>([]);
  const [activeSponsor, setActiveSponsor] = useState<ActiveSponsor | null>(null);
  const [downlines, setDownlines] = useState<Downline[]>([]);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Get current player's ID
        const { data: playerData } = await supabase
          .from('players')
          .select('id')
          .eq('auth_id', user.id)
          .single();

        if (!playerData) return;

        // Check for pending sponsor request
        const { data: pendingRequest } = await supabase
          .from('player_relationships')
          .select('*')
          .eq('downline_id', playerData.id)
          .eq('status', 'pending')
          .maybeSingle();

        setHasPendingRequest(!!pendingRequest);

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

        const fetchedDownlines = downlineData?.map(d => ({
          id: d.downline.id,
          alias: d.downline.alias
        })) || [];

        setDownlines(fetchedDownlines);

        // Create network structure
        const mockNetwork = {
          id: "sponsor",
          alias: hasPendingRequest ? "In Review" : "Request a Sponsor",
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
        setNetwork(mockNetwork);
      } catch (error) {
        console.error('Error fetching network data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load network data",
        });
      }
    };

    fetchData();
  }, [user, toast]);

  return {
    network,
    hasPendingRequest,
    downlines,
    adminProfiles,
    activeSponsor,
    setAdminProfiles,
    setActiveSponsor
  };
};