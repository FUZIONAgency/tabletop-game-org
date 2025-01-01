export interface NetworkData {
  network: {
    id: string;
    alias: string;
    children: any[];
  } | null;
  adminProfiles: Array<{
    id: string;
    username: string;
  }>;
  activeSponsor: {
    uplineId: string;
    uplineUsername: string;
  } | null;
  downlines: Array<{
    id: string;
    alias: string;
  }>;
  hasPendingRequest: boolean;
  refetch: () => void;
}