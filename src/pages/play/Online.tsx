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

interface Game {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
}

const OnlineGames = () => {
  const { data: games, isLoading } = useQuery({
    queryKey: ["online-games"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Game[];
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
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games?.map((game) => (
            <TableRow key={game.id}>
              <TableCell className="font-medium">{game.title}</TableCell>
              <TableCell>{game.description}</TableCell>
              <TableCell>
                <Badge
                  variant={game.status === "draft" ? "secondary" : "default"}
                >
                  {game.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(game.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OnlineGames;