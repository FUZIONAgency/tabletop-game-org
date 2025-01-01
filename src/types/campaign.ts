import { GameSystem } from "./game-system";

export interface Campaign {
  id: string;
  title: string;
  description?: string;
  game_system?: GameSystem;
  type_id: string;
  min_players: number;
  max_players: number;
  price: number;
  status?: string;
  created_at: string;
  is_member?: boolean;
  is_owner?: boolean;
  owner_alias?: string;
}