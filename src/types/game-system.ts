export interface GameSystem {
  id: string;
  name: string;
  description?: string;
  logo_image_url: string | null;
  video_url?: string | null;
  type?: string;
  status?: string;
}