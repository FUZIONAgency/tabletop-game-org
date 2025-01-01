export interface Session {
  id: string;
  start_date: string;
  end_date?: string;
  price: number;
  campaign: Campaign;
}