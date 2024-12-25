export interface PlayerSession {
  id: string;
  attendance_status: string;
}

export interface Session {
  id: string;
  campaign_id: string;
  session_number: number;
  start_date: string;
  end_date: string | null;
  description: string | null;
  status: string | null;
  price: number;
  player_session?: PlayerSession[];
}