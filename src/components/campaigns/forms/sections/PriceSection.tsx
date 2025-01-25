import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CampaignFormData } from "../types";

type Props = {
  register: UseFormRegister<CampaignFormData>;
  errors: FieldErrors<CampaignFormData>;
};

export function PriceSection({ register, errors }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="price">Price</Label>
      <Input
        id="price"
        type="number"
        step="0.01"
        {...register("price", { 
          required: "Price is required",
          valueAsNumber: true,
          min: {
            value: 0,
            message: "Price cannot be negative"
          }
        })}
        placeholder="0.00"
        className={errors.price ? "border-red-500" : ""}
      />
      {errors.price && (
        <p className="text-sm text-red-500">{errors.price.message}</p>
      )}
    </div>
  );
}