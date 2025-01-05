import { GameSystem } from './game-system';

export interface PlayerGameAccount {
  id: string;
  player_id: string;
  game_system_id: string;
  account_id: string;
  status: string;
  game_system: GameSystem;
}