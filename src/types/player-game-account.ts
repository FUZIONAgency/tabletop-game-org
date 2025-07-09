import { GameSystem } from './game-system';
import { DBPlayerGameAccount } from './db-schema';

// Domain model that extends the database type
export interface PlayerGameAccount extends DBPlayerGameAccount {
  // Additional domain property
  game_system: GameSystem;
}