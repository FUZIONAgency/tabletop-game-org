import { useAuth } from "@/contexts/auth";
import { ProfileCard } from "@/components/sections/player/ProfileCard";
import { PlayerCard } from "@/components/sections/player/PlayerCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
    <Section
      id="profile"
      title="My Profile"
      subtitle="Account Information"
      className="bg-background"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <ProfileCard profile={profile} />
        <PlayerCard player={player} userEmail={user?.email ?? ""} onSuccess={() => {}} />
      </div>
    </Section>
  );
};

export default Profile;