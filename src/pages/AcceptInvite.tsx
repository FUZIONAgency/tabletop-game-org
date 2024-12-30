import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePlayerForm } from "@/components/forms/CreatePlayerForm";

const AcceptInvite = () => {
  const { token } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [invite, setInvite] = useState<any>(null);
  const [inviter, setInviter] = useState<any>(null);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
  const [showCreatePlayer, setShowCreatePlayer] = useState(false);

  useEffect(() => {
    if (!token) return;
    
    const fetchInvite = async () => {
      const { data: inviteData, error: inviteError } = await supabase
        .from("invites")
        .select("*, user_id")
        .eq("token", token)
        .maybeSingle();

      if (inviteError || !inviteData) {
        toast({
          title: "Error",
          description: "Invalid or expired invitation",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setInvite(inviteData);

      // Fetch inviter's player profile
      const { data: inviterData } = await supabase
        .from("players")
        .select("*")
        .eq("auth_id", inviteData.user_id)
        .maybeSingle();

      setInviter(inviterData);
    };

    fetchInvite();
  }, [token, navigate, toast]);

  useEffect(() => {
    if (!user?.id) {
      // Store the current path for redirect after login
      navigate("/auth", { state: { returnTo: location.pathname } });
      return;
    }

    const fetchCurrentPlayer = async () => {
      const { data: playerData } = await supabase
        .from("players")
        .select("*")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (playerData) {
        setCurrentPlayer(playerData);
      } else {
        setShowCreatePlayer(true);
      }
    };

    fetchCurrentPlayer();
  }, [user, navigate, location.pathname]);

  const handleAcceptInvite = async () => {
    if (!currentPlayer || !invite || !inviter) return;

    try {
      const now = new Date().toISOString();
      
      // Update invite status
      const { error: inviteError } = await supabase
        .from("invites")
        .update({
          status: "accepted",
          decision: "accepted",
          accepted_at: now,
          accepted_by_player_id: currentPlayer.id
        })
        .eq("token", token);

      if (inviteError) throw inviteError;

      // Create relationship
      const { error: relationshipError } = await supabase
        .from("player_relationships")
        .insert([
          {
            upline_id: inviter.id,
            downline_id: currentPlayer.id,
            status: "active",
            type: "requested sponsor of"
          }
        ]);

      if (relationshipError) throw relationshipError;

      toast({
        title: "Success",
        description: "Invitation accepted successfully",
      });

      navigate("/my/network");
    } catch (error) {
      console.error("Error accepting invite:", error);
      toast({
        title: "Error",
        description: "Failed to accept invitation",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null;
  }

  if (showCreatePlayer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Your Player Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <CreatePlayerForm 
              email={user.email ?? ""} 
              onSuccess={() => setShowCreatePlayer(false)}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Accept Invitation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {inviter && (
            <p className="text-lg">
              You've been invited by <span className="font-semibold">{inviter.alias}</span>
            </p>
          )}
          <Button 
            onClick={handleAcceptInvite}
            className="w-full bg-gold hover:bg-gold/90"
          >
            Accept
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcceptInvite;