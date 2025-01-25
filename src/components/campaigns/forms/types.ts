import { z } from "zod";

// Session form schema and type
export const sessionFormSchema = z.object({
  session_number: z.coerce.number().min(1, "Session number must be at least 1"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
});

export type SessionFormData = z.infer<typeof sessionFormSchema>;

// Campaign form schema and type
export const campaignFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type_id: z.string().min(1, "Campaign type is required"),
  min_players: z.coerce.number().min(1, "Minimum players must be at least 1"),
  max_players: z.coerce.number().min(1, "Maximum players must be at least 1"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  game_system_id: z.string().min(1, "Game system is required"),
  retailer_id: z.string().optional(),
});

export type CampaignFormData = z.infer<typeof campaignFormSchema>;

// Edit campaign form type
export type EditFormData = {
  title: string;
  description: string;
  type_id: string;
  min_players: number;
  max_players: number;
  price: number;
};