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
import { Loader2 } from "lucide-react";

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
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["online-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Campaign[];
    },
  });

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Players</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns?.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.title}</TableCell>
              <TableCell>{campaign.description}</TableCell>
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
    </div>
  );
};

export default OnlineGames;