import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Campaign } from "@/types/campaign";
import { useState } from "react";

interface CampaignTableProps {
  campaigns: Campaign[];
  onJoinCampaign: (campaignId: string) => Promise<void>;
}

export const CampaignTable = ({ campaigns, onJoinCampaign }: CampaignTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  if (campaigns.length === 0) {
    return <p className="text-center text-gray-500">No online campaigns available.</p>;
  }

  const handleJoinClick = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setIsDialogOpen(true);
  };

  const handleConfirmJoin = async () => {
    if (selectedCampaignId) {
      await onJoinCampaign(selectedCampaignId);
      setIsDialogOpen(false);
      setSelectedCampaignId(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="text-left">Title</TableHead>
          <TableHead className="text-left">Description</TableHead>
          <TableHead>Players</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell>
              <Dialog open={isDialogOpen && selectedCampaignId === campaign.id} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="default" 
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => handleJoinClick(campaign.id)}
                  >
                    Join
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join Campaign</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to join "{campaign.title}"?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-4 mt-4">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      variant="default"
                      onClick={handleConfirmJoin}
                    >
                      Confirm
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
            <TableCell className="font-medium text-left">{campaign.title}</TableCell>
            <TableCell className="text-left">{campaign.description}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};