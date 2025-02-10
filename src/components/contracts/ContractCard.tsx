
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { ContractProfile } from "./types";

interface ContractCardProps {
  contract: ContractProfile;
}

export const ContractCard = ({ contract }: ContractCardProps) => {
  return (
    <Card key={contract.id}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {contract.contract.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {contract.contract.description}
        </p>
      </CardContent>
    </Card>
  );
};
