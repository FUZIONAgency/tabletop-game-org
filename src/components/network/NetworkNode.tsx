import { Card } from "@/components/ui/card";
import { Plus, Trees, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InviteForm } from "../invites/InviteForm";
import { useState } from "react";

interface NetworkNodeProps {
  node: {
    id: string;
    alias: string;
    children: any[];
  };
  activeSponsor: { uplineId: string; uplineUsername: string } | null;
  adminProfiles: { id: string; username: string }[];
  onSponsorRequest: (adminProfileId: string) => void;
  onInviteCreated?: (invite: any) => void;
}

export const NetworkNode = ({ 
  node, 
  activeSponsor, 
  adminProfiles, 
  onSponsorRequest,
  onInviteCreated 
}: NetworkNodeProps) => {
  const navigate = useNavigate();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleNodeClick = (nodeId: string) => {
    if (nodeId === "root") {
      navigate("/my/profile");
    }
  };

  const handleNewInviteClick = () => {
    setIsInviteModalOpen(true);
  };

  return (
    <div key={node.id} className="flex flex-col items-center relative">
      <Card 
        className={`p-4 mb-4 w-32 text-center relative z-10 ${
          node.id === "sponsor" && activeSponsor 
            ? "bg-forest-green text-white hover:bg-forest-green/90" 
            : node.id === "root"
            ? "bg-white hover:bg-gold cursor-pointer"
            : "bg-white hover:bg-gold"
        } transition-colors duration-200`}
        onClick={() => handleNodeClick(node.id)}
      >
        {node.id === "sponsor" ? (
          activeSponsor ? (
            <div className="flex items-center justify-center gap-1">
              <Trees className="h-4 w-4" />
              {activeSponsor.uplineUsername}
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center gap-1 text-primary hover:text-primary/80">
                <Link2 className="h-4 w-4" />
                {node.alias}
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
          )
        ) : node.id === "left" || node.id === "right" ? (
          <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
            <DialogTrigger asChild>
              <a 
                href="#" 
                className="flex items-center justify-center gap-1 text-primary hover:text-primary/80"
                onClick={handleNewInviteClick}
              >
                <Plus className="h-4 w-4" />
                {node.alias}
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
        ) : (
          <p className="font-medium">{node.alias}</p>
        )}
      </Card>
      {node.children.length > 0 && (
        <>
          <div className="w-[2px] h-8 border-l-2 border-dashed border-gray-300" />
          <div className="flex gap-8 mt-4 relative">
            {node.children.length > 1 && (
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 h-[2px] border-t-2 border-dashed border-gray-300" 
                style={{ width: 'calc(100% - 2rem)' }} 
              />
            )}
            {node.children.map((child) => (
              <NetworkNode
                key={child.id}
                node={child}
                activeSponsor={activeSponsor}
                adminProfiles={adminProfiles}
                onSponsorRequest={onSponsorRequest}
                onInviteCreated={onInviteCreated}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};