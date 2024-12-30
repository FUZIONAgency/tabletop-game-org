import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InviteForm } from "../invites/InviteForm";
import { useState } from "react";

interface InviteNodeProps {
  onInviteCreated?: (invite: any) => void;
}

export const InviteNode = ({ onInviteCreated }: InviteNodeProps) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleNewInviteClick = () => {
    setIsInviteModalOpen(true);
  };

  return (
    <Card className="p-4 mb-4 w-32 text-center bg-white hover:bg-gold">
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogTrigger asChild>
          <a 
            href="#" 
            className="flex items-center justify-center gap-1 text-primary hover:text-primary/80"
            onClick={handleNewInviteClick}
          >
            <Plus className="h-4 w-4" />
            New Invite
          </a>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send New Invite</DialogTitle>
          </DialogHeader>
          <InviteForm
            onInviteCreated={onInviteCreated}
            onClose={() => setIsInviteModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};