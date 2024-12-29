import { useAuth } from "@/contexts/auth";
import ProfileCard from "@/components/sections/player/ProfileCard";
import { PlayerCard } from "@/components/sections/player/PlayerCard";
import AuthUserCard from "@/components/sections/auth/AuthUserCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";

const Profile = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: player } = useQuery({
    queryKey: ["player", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("players")
        .select("*")
        .eq("auth_id", user?.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Section
          id="profile"
          title="My Profile"
          subtitle="Account Information"
          className="bg-background"
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div className="w-full">
              <AuthUserCard userId={user?.id} />
            </div>
            <div className="w-full">
              <ProfileCard profile={profile} />
            </div>
            <div className="w-full">
              <PlayerCard player={player} userEmail={user?.email ?? ""} onSuccess={() => {}} />
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default Profile;