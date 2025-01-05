import { BaseEntity } from './common';
import { GameSystem } from './game-system';

export interface Exam extends BaseEntity {
  name: string;
  weight: number;
  game_system: GameSystem;
  game_system_id?: string;
}

export interface PlayerExam extends BaseEntity {
  score: number | null;
  exam: Exam;
  player_id?: string;
  approval_player_id?: string | null;
}