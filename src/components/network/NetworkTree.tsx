import { NetworkNode } from "./NetworkNode";
import { useAuth } from "@/contexts/auth";
import { handleSponsorRequest } from "@/utils/sponsorRequests";
import { useNetworkData } from "./useNetworkData";
import { useToast } from "@/hooks/use-toast";

export const NetworkTree = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const {
    network,
    hasPendingRequest,
    adminProfiles,
    activeSponsor,
    setAdminProfiles,
    setActiveSponsor
  } = useNetworkData(user);

  const onSponsorRequest = async (adminProfileId: string) => {
    try {
      await handleSponsorRequest(adminProfileId, user);
      
      toast({
        title: "Success",
        description: "Sponsor request sent successfully",
      });
    } catch (error) {
      console.error('Error requesting sponsor:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send sponsor request",
        variant: "destructive",
      });
    }
  };

  const handleInviteCreated = (invite: any) => {
    console.log('New invite created:', invite);
  };

  return network ? (
    <NetworkNode
      node={network}
      hasPendingRequest={hasPendingRequest}
      activeSponsor={activeSponsor}
      adminProfiles={adminProfiles}
      onSponsorRequest={onSponsorRequest}
      onInviteCreated={handleInviteCreated}
    />
  ) : null;
};