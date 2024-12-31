import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { Campaign } from "@/types/campaign";
import { EditCampaignForm } from "@/components/campaigns/EditCampaignForm";

const EditCampaign = () => {
  const { id } = useParams();

  const { data: campaign, isLoading, error } = useQuery({
    queryKey: ['campaign', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          game_system:game_systems (
            name
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Campaign;
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading campaign details. Please try again later.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Section
          id="edit-campaign"
          title="Edit Campaign"
          subtitle="Update your campaign details"
        >
          {isLoading ? (
            <div className="space-y-4 max-w-2xl">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : campaign ? (
            <EditCampaignForm campaign={campaign} />
          ) : (
            <p className="text-gray-500">Campaign not found.</p>
          )}
        </Section>
      </main>
    </div>
  );
};

export default EditCampaign;