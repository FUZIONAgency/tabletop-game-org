import { NetworkNode } from "./NetworkNode";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { handleSponsorRequest } from "@/utils/sponsorRequests";
import { useNetworkData } from "./hooks/useNetworkData";

export const NetworkTree = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { network, adminProfiles, activeSponsor, hasPendingRequest } = useNetworkData(user?.id);

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

  // If there's a pending relationship where the player is the upline, add it as a child to the root node
  if (network?.children?.[0]?.id === "root") {
    const pendingNode = {
      id: "pending",
      alias: "Pending Acceptance",
      children: []
    };
    
    if (hasPendingRequest) {
      network.children[0].children = [pendingNode, ...network.children[0].children];
    }
  }

  return network ? (
    <NetworkNode
      node={network}
      activeSponsor={activeSponsor}
      adminProfiles={adminProfiles}
      onSponsorRequest={onSponsorRequest}
      onInviteCreated={handleInviteCreated}
      hasPendingRequest={hasPendingRequest}
    />
  ) : null;
};