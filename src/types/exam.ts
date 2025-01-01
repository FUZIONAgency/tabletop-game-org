import { GameSystem } from "./game-system";

export interface Exam {
  id: string;
  name: string;
  weight: number;
  game_system: GameSystem;
}

export interface PlayerExam {
  id: string;
  score: number;
  exam: Exam;
}