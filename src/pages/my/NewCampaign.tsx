import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  title: string;
  description: string;
  type_id: string;
  min_players: number;
  max_players: number;
  price: number;
  game_system_id: string;
  retailer_id?: string;
};

const NewCampaign = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [retailerValue, setRetailerValue] = useState("");

  const { data: campaignTypes } = useQuery({
    queryKey: ['campaignTypes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaign_types')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: gameSystems } = useQuery({
    queryKey: ['gameSystems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('game_systems')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: retailers } = useQuery({
    queryKey: ['retailers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('retailers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .insert({
          title: data.title,
          description: data.description,
          type_id: data.type_id,
          min_players: data.min_players,
          max_players: data.max_players,
          price: data.price,
          game_system_id: data.game_system_id,
          retailer_id: data.retailer_id || null,
          auth_id: user?.id
        });

      if (error) throw error;

      toast.success("Campaign created successfully");
      navigate('/my/games');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error("Failed to create campaign");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Section
          id="new-campaign"
          title="Create New Campaign"
          subtitle="Set up your new gaming campaign"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title", { required: true })}
                placeholder="Enter campaign title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Describe your campaign"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="game_system_id">Game System</Label>
              <Select
                onValueChange={(value) => setValue("game_system_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select game system" />
                </SelectTrigger>
                <SelectContent>
                  {gameSystems?.map((system) => (
                    <SelectItem key={system.id} value={system.id}>
                      {system.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type_id">Campaign Type</Label>
              <Select
                onValueChange={(value) => setValue("type_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {campaignTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retailer_id">Retailer (Optional)</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {retailerValue
                      ? retailers?.find((retailer) => retailer.id === retailerValue)?.name
                      : "Select retailer..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search retailers..." />
                    <CommandEmpty>No retailer found.</CommandEmpty>
                    <CommandGroup>
                      {retailers?.map((retailer) => (
                        <CommandItem
                          key={retailer.id}
                          value={retailer.name}
                          onSelect={(currentValue) => {
                            const selectedRetailer = retailers.find(r => r.name.toLowerCase() === currentValue.toLowerCase());
                            if (selectedRetailer) {
                              setRetailerValue(selectedRetailer.id);
                              setValue("retailer_id", selectedRetailer.id);
                            }
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              retailerValue === retailer.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {retailer.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
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
                  placeholder="1"
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
                  placeholder="4"
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
                placeholder="0.00"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit">
                Create Campaign
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
        </Section>
      </main>
    </div>
  );
};

export default NewCampaign;