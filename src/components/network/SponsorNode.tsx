import { Trees, Link2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SponsorNodeProps {
  activeSponsor: { uplineId: string; uplineUsername: string } | null;
  adminProfiles: { id: string; username: string }[];
  onSponsorRequest: (adminProfileId: string) => void;
}

export const SponsorNode = ({ 
  activeSponsor, 
  adminProfiles, 
  onSponsorRequest 
}: SponsorNodeProps) => {
  if (activeSponsor) {
    return (
      <Card className="p-4 mb-4 w-32 text-center bg-forest-green text-white hover:bg-forest-green/90">
        <div className="flex items-center justify-center gap-1">
          <Trees className="h-4 w-4" />
          {activeSponsor.uplineUsername}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 mb-4 w-32 text-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center gap-1 text-primary hover:text-primary/80">
          <Link2 className="h-4 w-4" />
          Request a Sponsor
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {adminProfiles.map((profile) => (
            <DropdownMenuItem
              key={profile.id}
              onClick={() => onSponsorRequest(profile.id)}
            >
              {profile.username}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};