import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useInviteForm } from "./useInviteForm";
import { InviteFormField } from "./InviteFormField";

interface InviteFormProps {
  onInviteCreated: (invite: any) => void;
  onClose: () => void;
}

export const InviteForm = ({ onInviteCreated, onClose }: InviteFormProps) => {
  const { form, onSubmit } = useInviteForm({ onInviteCreated, onClose });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <InviteFormField
          form={form}
          name="email"
          label="Email"
          placeholder="Email"
        />
        <InviteFormField
          form={form}
          name="firstName"
          label="First Name"
          placeholder="First Name"
        />
        <InviteFormField
          form={form}
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
        />
        <InviteFormField
          form={form}
          name="cell"
          label="Cell Phone"
          placeholder="Cell Phone"
          required={false}
        />
        <Button type="submit" className="w-full">
          Send Invite
        </Button>
      </form>
    </Form>
  );
};