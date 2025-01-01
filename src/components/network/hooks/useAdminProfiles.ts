import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminProfile } from "../types/NetworkTypes";

export const useAdminProfiles = () => {
  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>([]);

  useEffect(() => {
    const fetchAdminProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('role', 'admin');

      if (error) {
        console.error('Error fetching admin profiles:', error);
        return;
      }

      if (data) {
        setAdminProfiles(data);
      }
    };

    fetchAdminProfiles();
  }, []);

  return adminProfiles;
};