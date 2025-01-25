import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormData } from "./types";

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export function PlayerCountInputs({ register, errors }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="min_players">Min Players</Label>
        <Input
          id="min_players"
          type="number"
          {...register("min_players", { 
            required: "Minimum players is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Minimum players must be at least 1"
            }
          })}
          placeholder="1"
          className={errors.min_players ? "border-red-500" : ""}
        />
        {errors.min_players && (
          <p className="text-sm text-red-500">{errors.min_players.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="max_players">Max Players</Label>
        <Input
          id="max_players"
          type="number"
          {...register("max_players", { 
            required: "Maximum players is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Maximum players must be at least 1"
            }
          })}
          placeholder="4"
          className={errors.max_players ? "border-red-500" : ""}
        />
        {errors.max_players && (
          <p className="text-sm text-red-500">{errors.max_players.message}</p>
        )}
      </div>
    </div>
  );
}