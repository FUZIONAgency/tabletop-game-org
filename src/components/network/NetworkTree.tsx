import { NetworkNode } from "./NetworkNode";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { handleSponsorRequest } from "@/utils/sponsorRequests";
import { useNetworkData } from "./hooks/useNetworkData";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface PendingDownline {
  id: string;
  relationshipId: string;
  alias: string;
}

export const NetworkTree = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDownlines, setPendingDownlines] = useState<PendingDownline[]>([]);
  const { network, adminProfiles, activeSponsor, hasPendingRequest, refetch } = useNetworkData(user?.id);

  const fetchPendingDownlines = async () => {
    if (!user) return;

    try {
      const { data: playerData } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', user.id)
        .maybeSingle();

      if (!playerData) return;

      const { data: relationships, error } = await supabase
        .from('player_relationships')
        .select(`
          id,
          downline:players!player_relationships_downline_id_fkey (
            id,
            alias
          )
        `)
        .eq('upline_id', playerData.id)
        .eq('status', 'pending');

      if (error) throw error;

      setPendingDownlines(
        relationships?.map(r => ({
          id: r.downline.id,
          relationshipId: r.id,
          alias: r.downline.alias
        })) || []
      );
    } catch (error) {
      console.error('Error fetching pending downlines:', error);
      toast({
        title: "Error",
        description: "Failed to load pending relationships",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDownlines();
  }, [user]);

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

  const handleRelationshipUpdated = () => {
    fetchPendingDownlines();
    refetch();
  };

  if (isLoading || !network) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-32 mx-auto" />
        <div className="flex justify-center gap-8">
          <Skeleton className="h-32 w-32" />
          <Skeleton className="h-32 w-32" />
        </div>
      </div>
    );
  }

  return (
    <NetworkNode
      node={network}
      activeSponsor={activeSponsor}
      adminProfiles={adminProfiles}
      onSponsorRequest={onSponsorRequest}
      onInviteCreated={handleInviteCreated}
      hasPendingRequest={hasPendingRequest}
      pendingDownlines={pendingDownlines}
      onRelationshipUpdated={handleRelationshipUpdated}
    />
  );
};