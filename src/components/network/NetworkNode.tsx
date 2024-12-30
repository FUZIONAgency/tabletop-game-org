import { SponsorNode } from "./SponsorNode";
import { InviteNode } from "./InviteNode";
import { PlayerNode } from "./PlayerNode";

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
  const renderNode = () => {
    switch (node.id) {
      case "sponsor":
        return (
          <SponsorNode
            activeSponsor={activeSponsor}
            adminProfiles={adminProfiles}
            onSponsorRequest={onSponsorRequest}
          />
        );
      case "left":
      case "right":
        return <InviteNode onInviteCreated={onInviteCreated} />;
      case "root":
        return <PlayerNode isRoot />;
      default:
        return <PlayerNode />;
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      {renderNode()}
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