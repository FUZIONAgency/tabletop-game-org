export interface Tournament {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  image_url: string | null;
  prize_pool: number | null;
}

export interface TournamentEntry {
  id: string;
  tournament_id: string;
  player_id: string;
  registration_date?: string;
  status?: string;
  final_rank?: number;
  tournament: Tournament;
}