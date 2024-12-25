import { useAuth } from "@/contexts/auth";
import { ProfileCard } from "@/components/sections/player/ProfileCard";
import { PlayerCard } from "@/components/sections/player/PlayerCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Section from "@/components/Section";

const Profile = () => {
  const { user } = useAuth();

  const { data: player } = useQuery({
    queryKey: ["player", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("players")
        .select("*")
        .eq("auth_id", user?.id)
        .single();
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
        <ProfileCard profile={user} />
        <PlayerCard player={player} userEmail={user?.email ?? ""} onSuccess={() => {}} />
      </div>
    </Section>
  );
};

export default Profile;