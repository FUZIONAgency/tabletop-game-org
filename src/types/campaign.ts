import { GameSystem } from "./game-system";
import { Retailer } from "./retailer";

export interface Campaign {
  id: string;
  game_system_id: string;
  game_system?: GameSystem;
  retailer_id?: string | null;
  retailer?: Retailer;
  title: string;
  description?: string | null;
  type?: string | null;
  type_id: string;
  min_players: number;
  max_players: number;
  status?: string | null;
  price: number;
  created_at?: string;
  is_member?: boolean;
  is_owner?: boolean;
  owner_alias?: string;
}