import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCampaigns = () => {
  return useQuery({
    queryKey: ["online-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("type", "online")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};