import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "./types";

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export function CampaignBasicInfo({ register, errors }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter campaign title"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Describe your campaign"
        />
      </div>
    </>
  );
}