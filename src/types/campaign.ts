import { BaseEntity } from './common';
import { GameSystem, GameSystemBasic } from './game-system';

export interface Campaign extends BaseEntity {
  title: string;
  description: string | null;
  game_system: GameSystemBasic;
  game_system_id: string;
  min_players: number;
  max_players: number;
  price: number;
  status?: string;
  type?: string;
  type_id: string;
  retailer_id?: string | null;
  is_member?: boolean;
  is_owner?: boolean;
  owner_alias?: string;
  owner?: any[];
}