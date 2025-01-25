import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SessionFormData } from "../types";

type Props = {
  register: UseFormRegister<SessionFormData>;
  errors: FieldErrors<SessionFormData>;
};

export function SessionDescriptionSection({ register, errors }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        {...register("description", { required: "Description is required" })}
        placeholder="Describe the session"
        className={errors.description ? "border-red-500" : ""}
      />
      {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
      )}
    </div>
  );
}