import { z } from "zod";

export const formSchema = z.object({
  session_number: z.coerce.number().min(1, "Session number must be at least 1"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
});

export type FormData = z.infer<typeof formSchema>;