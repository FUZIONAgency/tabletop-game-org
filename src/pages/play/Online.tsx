import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  created_at: string;
  type: string | null;
  min_players: number;
  max_players: number;
  price: number;
}

const OnlineGames = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: campaigns, isLoading, refetch } = useQuery({
    queryKey: ["online-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("type", "online")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Campaign[];
    },
  });

  const handleJoinCampaign = async (campaignId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join campaigns",
        variant: "destructive",
      });
      return;
    }

    try {
      // First check if there are any existing players
      const { data: existingPlayers } = await supabase
        .from("campaign_players")
        .select("*")
        .eq("campaign_id", campaignId);

      const roleType = existingPlayers && existingPlayers.length === 0 ? "owner" : "player";

      // Get the player record for the current user
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (!playerData) {
        toast({
          title: "Player profile required",
          description: "Please create a player profile first",
          variant: "destructive",
        });
        return;
      }

      // Check if the user is already in the campaign
      const { data: existingPlayer } = await supabase
        .from("campaign_players")
        .select("*")
        .eq("campaign_id", campaignId)
        .eq("player_id", playerData.id)
        .single();

      if (existingPlayer) {
        toast({
          title: "Already joined",
          description: "You are already a member of this campaign",
          variant: "destructive",
        });
        return;
      }

      // Join the campaign
      const { error: joinError } = await supabase
        .from("campaign_players")
        .insert({
          campaign_id: campaignId,
          player_id: playerData.id,
          role_type: roleType,
          status: "active",
        });

      if (joinError) throw joinError;

      toast({
        title: "Success!",
        description: `You have joined the campaign as ${roleType}`,
      });

      refetch();
    } catch (error) {
      console.error("Error joining campaign:", error);
      toast({
        title: "Error",
        description: "Failed to join campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Online Games</h1>
      {campaigns?.length === 0 ? (
        <p className="text-center text-gray-500">No online campaigns available.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Description</TableHead>
              <TableHead>Players</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns?.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                        Join
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Join Campaign</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to join "{campaign.title}"?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-4 mt-4">
                        <Button
                          variant="default"
                          onClick={() => handleJoinCampaign(campaign.id)}
                        >
                          Confirm
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="font-medium text-left">{campaign.title}</TableCell>
                <TableCell className="text-left">{campaign.description}</TableCell>
                <TableCell>{campaign.min_players}-{campaign.max_players}</TableCell>
                <TableCell>${campaign.price}</TableCell>
                <TableCell>
                  <Badge
                    variant={campaign.status === "draft" ? "secondary" : "default"}
                  >
                    {campaign.status || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(campaign.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OnlineGames;