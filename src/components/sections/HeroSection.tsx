import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const HeroSection = () => {
  const { role, user } = useAuth();
  const [pendingInvite, setPendingInvite] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkForInvite = async () => {
      if (!user?.email) return;

      const { data: invite } = await supabase
        .from("invites")
        .select("*")
        .eq("email", user.email)
        .is("accepted_at", null)
        .maybeSingle();

      setPendingInvite(invite);
    };

    checkForInvite();
  }, [user?.email]);

  const handleAcceptInvite = async () => {
    if (!user?.id || !pendingInvite) return;

    try {
      const now = new Date().toISOString();
      
      // Update invite status
      const { error: inviteError } = await supabase
        .from("invites")
        .update({
          status: "accepted",
          decision: "accepted",
          accepted_at: now,
        })
        .eq("id", pendingInvite.id);

      if (inviteError) throw inviteError;

      // Get the current player's ID
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (playerData) {
        // Get the inviter's player record
        const { data: inviterData } = await supabase
          .from("players")
          .select("id")
          .eq("auth_id", pendingInvite.user_id)
          .maybeSingle();

        if (inviterData) {
          // Create relationship
          const { error: relationshipError } = await supabase
            .from("player_relationships")
            .insert([
              {
                upline_id: inviterData.id,
                downline_id: playerData.id,
                status: "active",
                type: "requested sponsor of"
              }
            ]);

          if (relationshipError) throw relationshipError;
        }
      }

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

  const scrollToQualify = () => {
    const qualifySection = document.getElementById("qualify");
    if (qualifySection) {
      qualifySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fadeIn">
          Play Games. Earn Rewards.
          <br />
          Go Pro.
        </h1>
        <p className="text-xl md:text-2xl mb-4 animate-fadeIn opacity-90">
          Join our community of gamers and entrepreneurs
        </p>
        <p className="text-lg mb-12 animate-fadeIn opacity-75">
          Current Role: {role}
        </p>
        {pendingInvite ? (
          <Button
            size="lg"
            className="bg-forest-green hover:bg-forest-green/90 text-white animate-fadeIn"
            onClick={handleAcceptInvite}
          >
            Accept Your Invitation
          </Button>
        ) : (
          <Button
            size="lg"
            className="bg-gold hover:bg-gold/90 text-black animate-fadeIn"
            onClick={scrollToQualify}
          >
            Get Started Now
          </Button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;