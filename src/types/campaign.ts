import { Database } from "@/integrations/supabase/types";

type GameSystem = {
  name: string | null;
};

export type Campaign = Database["public"]["Tables"]["campaigns"]["Row"] & {
  is_member?: boolean;
  is_owner?: boolean;
  owner_alias?: string | null;
  game_system?: GameSystem;
};