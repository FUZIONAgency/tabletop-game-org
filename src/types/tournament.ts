export interface Tournament {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  prize_pool?: number;
  max_participants?: number;
  registration_deadline?: string;
  image_url?: string;
  is_featured?: boolean;
  tournament_type?: string;
  status?: string;
  registration_url?: string;
  carousel_image?: string;
}