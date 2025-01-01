import { Campaign } from "./campaign";

export interface PlayerSession {
  id: string;
  player_id: string;
  attendance_status: string;
}

export interface Session {
  id: string;
  campaign_id: string;
  session_number: number;
  start_date: string;
  end_date?: string;
  price: number;
  description?: string;
  status?: string;
  campaign: Campaign;
  player_session?: PlayerSession[];
}