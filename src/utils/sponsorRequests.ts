import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export const handleSponsorRequest = async (adminProfileId: string, user: User | null) => {
  if (!user) {
    throw new Error("User must be logged in to request a sponsor");
  }

  // First get the player ID for the current user
  const { data: playerData, error: playerError } = await supabase
    .from('players')
    .select('id')
    .eq('auth_id', user.id)
    .single();

  if (playerError) throw playerError;

  // Get or create a player record for the admin
  const { data: adminPlayer, error: adminPlayerError } = await supabase
    .from('players')
    .select('id, auth_id')
    .eq('auth_id', adminProfileId)
    .maybeSingle();

  if (adminPlayerError) throw adminPlayerError;

  // Prevent self-sponsorship
  if (adminProfileId === user.id) {
    throw new Error("You cannot sponsor yourself");
  }

  let sponsorPlayerId: string;

  if (!adminPlayer) {
    // Get admin's profile to get their username
    const { data: adminProfile, error: profileError } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', adminProfileId)
      .single();

    if (profileError) throw profileError;

    // Create a player record for the admin if it doesn't exist
    const { data: newAdminPlayer, error: createError } = await supabase
      .from('players')
      .insert([
        {
          auth_id: adminProfileId,
          alias: adminProfile.username || 'Admin',
          email: user.email,
        }
      ])
      .select('id')
      .single();

    if (createError) throw createError;
    sponsorPlayerId = newAdminPlayer.id;
  } else {
    sponsorPlayerId = adminPlayer.id;
  }

  // Create the relationship
  const { error: relationshipError } = await supabase
    .from('player_relationships')
    .insert([
      {
        upline_id: sponsorPlayerId,
        downline_id: playerData.id,
        type: 'requested sponsor of',
        status: 'pending'
      }
    ]);

  if (relationshipError) throw relationshipError;
};