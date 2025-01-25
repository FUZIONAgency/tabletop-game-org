import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditFormData } from "./types";

type Props = {
  register: UseFormRegister<EditFormData>;
  defaultValues: {
    title: string;
    description: string;
  };
};

export function EditCampaignBasicInfo({ register, defaultValues }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          defaultValue={defaultValues.title}
          {...register("title", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          defaultValue={defaultValues.description || ''}
          {...register("description")}
        />
      </div>
    </>
  );
}