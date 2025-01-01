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
  network: any;
  adminProfiles: AdminProfile[];
  activeSponsor: ActiveSponsor | null;
  downlines: Downline[];
  hasPendingRequest: boolean;
  pendingRelationshipId: string | null;
}