import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthUserCardProps {
  userId: string | undefined;
}

const AuthUserCard = ({ userId }: AuthUserCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Auth User
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">User ID:</div>
          <div className="font-mono bg-muted p-2 rounded-md overflow-x-auto">
            {userId || "Not authenticated"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthUserCard;