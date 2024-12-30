export interface Invite {
  id: string;
  email: string;
  status: string;
  first_name: string | null;
  last_name: string | null;
  cell: string | null;
  date_sent: string | null;
  date_read: string | null;
  date_decided: string | null;
  decision: string | null;
  user_id: string;
  token: string | null;
}