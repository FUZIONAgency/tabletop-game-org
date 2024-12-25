import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameSystem {
  id: string;
  name: string;
  description: string | null;
  logo_image_url: string | null;
}

interface GameSystemCardProps {
  gameSystem: GameSystem;
}

export const GameSystemCard = ({ gameSystem }: GameSystemCardProps) => {
  return (
    <Card key={gameSystem.id}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">
          {gameSystem.name}
        </CardTitle>
        <Button className="ml-auto">
          <Check className="mr-2 h-4 w-4" />
          Qualify
        </Button>
      </CardHeader>
      <CardContent>
        {gameSystem.logo_image_url && (
          <img
            src={gameSystem.logo_image_url}
            alt={gameSystem.name}
            className="h-12 object-contain mb-4"
          />
        )}
        <p className="text-sm text-muted-foreground">
          {gameSystem.description}
        </p>
      </CardContent>
    </Card>
  );
};