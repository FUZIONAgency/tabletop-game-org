
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface Contract {
  id: string;
  name: string;
  description: string;
  content: string;
  accepted_date?: string | null;
  declined_date?: string | null;
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

  const getStatusText = () => {
    if (contract.accepted_date) {
      return `Accepted on ${format(new Date(contract.accepted_date), 'PPP')}`;
    }
    if (contract.declined_date) {
      return `Declined on ${format(new Date(contract.declined_date), 'PPP')}`;
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{contract.name}</DialogTitle>
          {getStatusText() && (
            <p className="text-sm text-muted-foreground mt-2">
              {getStatusText()}
            </p>
          )}
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
