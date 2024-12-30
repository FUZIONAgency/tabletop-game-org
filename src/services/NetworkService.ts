import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export interface PlayerData {
  id: string;
}

export interface Downline {
  id: string;
  alias: string;
}

export interface AdminProfile {
  id: string;
  username: string;
}

export const NetworkService = {
  async fetchPlayerData(userId: string): Promise<PlayerData | null> {
    const { data, error } = await supabase
      .from('players')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async fetchDownlines(playerId: string): Promise<Downline[]> {
    const { data, error } = await supabase
      .from('player_relationships')
      .select(`
        downline:players!player_relationships_downline_id_fkey (
          id,
          alias
        )
      `)
      .eq('upline_id', playerId)
      .eq('status', 'active');

    if (error) throw error;
    return (data?.map(d => ({
      id: d.downline.id,
      alias: d.downline.alias
    })) || []);
  },

  async fetchAdminProfiles(): Promise<AdminProfile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('role', 'admin');

    if (error) throw error;
    return data || [];
  },

  async fetchActiveSponsor(playerId: string): Promise<{ uplineId: string; uplineUsername: string } | null> {
    const { data: relationship, error: relationshipError } = await supabase
      .from('player_relationships')
      .select(`
        upline_id,
        players!player_relationships_upline_id_fkey (
          auth_id
        )
      `)
      .eq('downline_id', playerId)
      .eq('status', 'active')
      .maybeSingle();

    if (relationshipError) throw relationshipError;
    if (!relationship) return null;

    const { data: sponsorProfile, error: sponsorError } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', relationship.players.auth_id)
      .maybeSingle();

    if (sponsorError) throw sponsorError;
    if (!sponsorProfile) return null;

    return {
      uplineId: relationship.upline_id,
      uplineUsername: sponsorProfile.username
    };
  },

  async checkPendingRequest(playerId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('player_relationships')
      .select()
      .eq('downline_id', playerId)
      .eq('status', 'pending')
      .maybeSingle();

    if (error) throw error;
    return !!data;
  }
};