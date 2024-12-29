interface GameSystem {
  id: string;
  name: string;
  logo_image_url: string | null;
}

export interface Exam {
  id: string;
  name: string;
  weight: number;
  game_system?: GameSystem;
}

export interface PlayerExam {
  id: string;
  score: number | null;
  exam?: Exam;
}