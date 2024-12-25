import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Campaign } from "@/types/campaign";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SessionList } from "./SessionList";

interface CampaignTableProps {
  campaigns: Campaign[];
  onJoinCampaign: (campaignId: string) => Promise<void>;
  onLeaveCampaign: (campaignId: string) => Promise<void>;
}

export const CampaignTable = ({ campaigns, onJoinCampaign, onLeaveCampaign }: CampaignTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [dialogAction, setDialogAction] = useState<'join' | 'leave'>('join');
  const [expandedCampaigns, setExpandedCampaigns] = useState<string[]>([]);

  if (campaigns.length === 0) {
    return <p className="text-center text-gray-500">No online campaigns available.</p>;
  }

  const handleActionClick = (campaignId: string, action: 'join' | 'leave') => {
    setSelectedCampaignId(campaignId);
    setDialogAction(action);
    setIsDialogOpen(true);
  };

  const handleConfirmAction = async () => {
    if (selectedCampaignId) {
      if (dialogAction === 'join') {
        await onJoinCampaign(selectedCampaignId);
      } else {
        await onLeaveCampaign(selectedCampaignId);
      }
      setIsDialogOpen(false);
      setSelectedCampaignId(null);
    }
  };

  const toggleExpand = (campaignId: string) => {
    setExpandedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="text-left">Title</TableHead>
          <TableHead className="text-left">Description</TableHead>
          <TableHead>Game System</TableHead>
          <TableHead>Players</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <>
            <TableRow key={campaign.id}>
              <TableCell>
                <Dialog open={isDialogOpen && selectedCampaignId === campaign.id} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    {campaign.is_member ? (
                      <Button 
                        variant="default" 
                        className="bg-black hover:bg-gray-800"
                        onClick={() => handleActionClick(campaign.id, 'leave')}
                      >
                        Leave
                      </Button>
                    ) : (
                      <Button 
                        variant="default" 
                        className="bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => handleActionClick(campaign.id, 'join')}
                      >
                        Join
                      </Button>
                    )}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{dialogAction === 'join' ? 'Join' : 'Leave'} Campaign</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to {dialogAction} "{campaign.title}"?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4 mt-4">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="default"
                        onClick={handleConfirmAction}
                      >
                        Confirm
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="font-medium text-left">{campaign.title}</TableCell>
              <TableCell className="text-left">{campaign.description}</TableCell>
              <TableCell>{campaign.game_system?.name || 'N/A'}</TableCell>
              <TableCell>{campaign.min_players}-{campaign.max_players}</TableCell>
              <TableCell>${campaign.price}</TableCell>
              <TableCell>
                <Badge variant={campaign.status === "draft" ? "secondary" : "default"}>
                  {campaign.status || "N/A"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(campaign.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => toggleExpand(campaign.id)}
                >
                  {expandedCampaigns.includes(campaign.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
            {expandedCampaigns.includes(campaign.id) && (
              <TableRow>
                <TableCell colSpan={8} className="p-0">
                  <div className="bg-gray-50 p-4">
                    <SessionList campaignId={campaign.id} />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  );
};