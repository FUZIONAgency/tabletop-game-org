import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormData = {
  price: number;
};

type Props = {
  register: UseFormRegister<FormData>;
};

export function PriceInput({ register }: Props) {
  return (
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
  );
}