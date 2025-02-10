
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Contract {
  id: string;
  name: string;
  description: string;
  content: string;
}

interface ContractViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: Contract | null;
}

const ContractViewModal = ({
  open,
  onOpenChange,
  contract,
}: ContractViewModalProps) => {
  if (!contract) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{contract.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] mt-4">
          <div className="space-y-6 pr-6">
            <p className="text-sm text-muted-foreground">{contract.description}</p>
            <div className="mt-4 whitespace-pre-wrap">{contract.content}</div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ContractViewModal;
