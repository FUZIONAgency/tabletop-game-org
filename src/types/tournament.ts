export interface Tournament {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  image_url?: string;
  prize_pool?: number;
}