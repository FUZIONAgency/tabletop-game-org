export interface AdminProfile {
  id: string;
  username: string;
}

export interface ActiveSponsor {
  uplineId: string;
  uplineUsername: string;
}

export interface Downline {
  id: string;
  alias: string;
}

export interface NetworkData {
  id: string;
  alias: string;
  children: NetworkData[];
}