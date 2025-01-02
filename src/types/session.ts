import { Campaign } from "./campaign";

export interface PlayerSession {
  id: string;
  player_id: string;
  attendance_status: string;
}

export interface Session {
  id: string;
  campaign_id: string;
  campaign?: Campaign;
  session_number: number;
  start_date: string;
  end_date?: string | null;
  description?: string | null;
  status?: string | null;
  price: number;
  created_at?: string;
  player_session?: PlayerSession[];
}