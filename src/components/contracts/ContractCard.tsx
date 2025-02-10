
import { FileText, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface ContractCardProps {
  name: string;
  description: string;
  acceptedDate?: string | null;
  declinedDate?: string | null;
}

const ContractCard = ({ name, description, acceptedDate, declinedDate }: ContractCardProps) => {
  const getStatusIcon = () => {
    if (acceptedDate) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (declinedDate) {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
    return null;
  };

  const getStatusDate = () => {
    if (acceptedDate) {
      return `Accepted on ${format(new Date(acceptedDate), 'PP')}`;
    }
    if (declinedDate) {
      return `Declined on ${format(new Date(declinedDate), 'PP')}`;
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {name}
          {getStatusIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {description}
        </p>
        {getStatusDate() && (
          <p className="text-sm text-muted-foreground italic">
            {getStatusDate()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ContractCard;
