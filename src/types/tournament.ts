export interface Tournament {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  image_url: string | null;
  prize_pool: number;
  max_participants?: number;
  registration_deadline?: string;
  is_featured?: boolean;
  tournament_type?: string;
  status?: string;
  registration_url?: string;
  created_at?: string;
  updated_at?: string;
  carousel_image?: string;
}