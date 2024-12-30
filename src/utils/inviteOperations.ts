import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const handleInviteDecision = async (
  invite: any,
  decision: 'Accepted' | 'Declined',
  currentPlayerId: string
) => {
  try {
    // Get the inviter's player record
    const { data: inviterPlayer, error: inviterError } = await supabase
      .from("players")
      .select("id")
      .eq("auth_id", invite.user_id)
      .maybeSingle();

    console.log('Inviter player query result:', { inviterPlayer, inviterError });

    if (inviterError) throw inviterError;
    if (!inviterPlayer) throw new Error("Inviter player record not found");

    const now = new Date().toISOString();

    // Update the invite first
    const { error: inviteError } = await supabase
      .from("invites")
      .update({ 
        status: decision === 'Accepted' ? 'accepted' : 'declined',
        decision: decision.toLowerCase(),
        date_decided: now,
        accepted_at: decision === 'Accepted' ? now : null,
        accepted_by_player_id: decision === 'Accepted' ? currentPlayerId : null
      })
      .eq("id", invite.id);

    console.log('Invite update result:', { inviteError });

    if (inviteError) throw inviteError;

    // If accepted, create a player relationship
    if (decision === 'Accepted') {
      await handleRelationshipCreation(inviterPlayer.id, currentPlayerId);
    }

    return true;
  } catch (error) {
    console.error("Error handling invite decision:", error);
    throw error;
  }
};

const handleRelationshipCreation = async (uplineId: string, downlineId: string) => {
  // First check if a relationship already exists
  const { data: existingRelationship, error: checkError } = await supabase
    .from("player_relationships")
    .select("*")
    .eq("upline_id", uplineId)
    .eq("downline_id", downlineId)
    .maybeSingle();

  if (checkError) throw checkError;

  // Only create the relationship if it doesn't exist
  if (!existingRelationship) {
    console.log('Creating player relationship...', {
      upline_id: uplineId,
      downline_id: downlineId
    });

    const { error: relationshipError } = await supabase
      .from("player_relationships")
      .insert({
        upline_id: uplineId,
        downline_id: downlineId,
        type: 'requested sponsor of',
        status: 'active'
      });

    console.log('Player relationship creation result:', { relationshipError });

    if (relationshipError) throw relationshipError;
  }
};