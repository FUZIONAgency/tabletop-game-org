import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EditFormData } from "./types";

type Props = {
  register: UseFormRegister<EditFormData>;
  defaultValue: number;
};

export function EditCampaignPrice({ register, defaultValue }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="price">Price</Label>
      <Input
        id="price"
        type="number"
        step="0.01"
        defaultValue={defaultValue}
        {...register("price", { 
          required: true,
          valueAsNumber: true,
          min: 0
        })}
      />
    </div>
  );
}