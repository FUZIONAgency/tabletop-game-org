import { Campaign } from './campaign';

export interface PlayerSession {
  id: string;
  player_id: string;
  session_id: string;
  payment_status: string;
  attendance_status: string;
  session: Session;
}

export interface Session {
  id: string;
  campaign_id: string;
  session_number: number;
  start_date: string;
  description: string | null;
  status: string;
  price: number;
  end_date: string | null;
  campaign?: Campaign;
  player_session?: PlayerSession[];
  created_at?: string;
}