import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PlayerWithAlias {
  id: string;
  alias: string;
}

const Ratings = () => {
  const { data: players } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('id, alias');
      
      if (error) throw error;
      return data as PlayerWithAlias[];
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Player Ratings</h1>
      <ul>
        {players?.map(player => (
          <li key={player.id}>
            {player.alias}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ratings;
