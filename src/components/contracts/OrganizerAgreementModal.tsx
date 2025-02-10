
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrganizerClause {
  id: string;
  clause: {
    name: string;
    content: string;
  };
}

interface OrganizerAgreementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clauses: OrganizerClause[];
  onAgree: () => void;
  onDecline: () => void;
  title?: string;
}

const OrganizerAgreementModal = ({
  open,
  onOpenChange,
  clauses,
  onAgree,
  onDecline,
  title = "Agreement",
}: OrganizerAgreementModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] mt-4">
          <div className="space-y-6 pr-6">
            {clauses?.map((clause) => (
              <div key={clause.id} className="space-y-2">
                <h3 className="font-semibold">{clause.clause.name}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {clause.clause.content}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onDecline}>
            I Decline
          </Button>
          <Button onClick={onAgree}>
            I Agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizerAgreementModal;
