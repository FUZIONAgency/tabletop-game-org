import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Campaign } from "@/types/campaign";

type FormData = {
  title: string;
  description: string;
  type: string;
  min_players: number;
  max_players: number;
  price: number;
};

const EditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, setValue } = useForm<FormData>();

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
    meta: {
      onSuccess: (data: Campaign) => {
        // Pre-fill form with existing data
        setValue('title', data.title);
        setValue('description', data.description || '');
        setValue('type', data.type || '');
        setValue('min_players', data.min_players);
        setValue('max_players', data.max_players);
        setValue('price', data.price);
      }
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({
          title: data.title,
          description: data.description,
          type: data.type,
          min_players: data.min_players,
          max_players: data.max_players,
          price: data.price,
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign updated successfully",
      });

      navigate('/my/games');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update campaign",
      });
    }
  };

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
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  onValueChange={(value) => setValue("type", value)}
                  defaultValue={campaign?.type || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="retailer">Retailer</SelectItem>
                    <SelectItem value="convention">Convention</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min_players">Min Players</Label>
                  <Input
                    id="min_players"
                    type="number"
                    {...register("min_players", { 
                      required: true,
                      valueAsNumber: true,
                      min: 1
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max_players">Max Players</Label>
                  <Input
                    id="max_players"
                    type="number"
                    {...register("max_players", { 
                      required: true,
                      valueAsNumber: true,
                      min: 1
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { 
                    required: true,
                    valueAsNumber: true,
                    min: 0
                  })}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  Save Changes
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/my/games')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Section>
      </main>
    </div>
  );
};

export default EditCampaign;