import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SessionFormData } from "../types";

type Props = {
  register: UseFormRegister<SessionFormData>;
  errors: FieldErrors<SessionFormData>;
};

export function SessionNumberSection({ register, errors }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="session_number">Session Number</Label>
      <Input
        id="session_number"
        type="number"
        min={1}
        defaultValue=""
        {...register("session_number", {
          required: "Session number is required",
          valueAsNumber: true,
          min: {
            value: 1,
            message: "Session number must be at least 1"
          }
        })}
        className={errors.session_number ? "border-red-500" : ""}
      />
      {errors.session_number && (
        <p className="text-sm text-red-500">{errors.session_number.message}</p>
      )}
    </div>
  );
}