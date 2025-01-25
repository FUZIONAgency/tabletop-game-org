import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormData } from "./types";

type Props = {
  register: UseFormRegister<FormData>;
};

export function PlayerCountInputs({ register }: Props) {
  return (
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
  );
}