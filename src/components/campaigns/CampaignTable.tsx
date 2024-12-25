import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Campaign } from "@/types/campaign";

interface CampaignTableProps {
  campaigns: Campaign[];
  onJoinCampaign: (campaignId: string) => Promise<void>;
}

export const CampaignTable = ({ campaigns, onJoinCampaign }: CampaignTableProps) => {
  if (campaigns.length === 0) {
    return <p className="text-center text-gray-500">No online campaigns available.</p>;
  }

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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600">
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
                    <Button
                      variant="default"
                      onClick={() => onJoinCampaign(campaign.id)}
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