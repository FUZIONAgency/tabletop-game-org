export type EditFormData = {
  title: string;
  description: string;
  type_id: string;
  min_players: number;
  max_players: number;
  price: number;
};

export type FormData = {
  title: string;
  description: string;
  type_id: string;
  game_system_id: string;
  retailer_id?: string;
  min_players: number;
  max_players: number;
  price: number;
};