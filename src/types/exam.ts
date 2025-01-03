import { GameSystem } from "./game-system";

export interface Exam {
  id: string;
  name: string;
  weight: number;
  game_system: GameSystem;
  game_system_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PlayerExam {
  id: string;
  score: number | null;
  exam: Exam;
  player_id?: string;
  approval_player_id?: string | null;
  created_at?: string;
  updated_at?: string;
}