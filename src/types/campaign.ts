export interface Campaign {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  created_at: string;
  type: string | null;
  min_players: number;
  max_players: number;
  price: number;
}