import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Campaign } from "@/types/campaign";
import { ChevronDown, ChevronUp, Eye, Pencil } from "lucide-react";
import { SessionList } from "../SessionList";
import { useNavigate, useLocation } from "react-router-dom";

interface CampaignTableRowProps {
  campaign: Campaign;
  isExpanded: boolean;
  onToggleExpand: (campaignId: string) => void;
  onJoinAction: (campaignId: string, action: 'join' | 'leave') => void;
  isDialogOpen: boolean;
  selectedCampaignId: string | null;
  dialogAction: 'join' | 'leave';
  onConfirmAction: () => void;
  setIsDialogOpen: (open: boolean) => void;
}

export const CampaignTableRow = ({
  campaign,
  isExpanded,
  onToggleExpand,
  onJoinAction,
  isDialogOpen,
  selectedCampaignId,
  dialogAction,
  onConfirmAction,
  setIsDialogOpen
}: CampaignTableRowProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEditCampaign = (campaignId: string) => {
    navigate(`/my/games/${campaignId}/edit`, {
      state: { from: location.pathname }
    });
  };

  const handleViewCampaign = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <div className="flex gap-2">
            <Dialog open={isDialogOpen && selectedCampaignId === campaign.id} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                {campaign.is_member ? (
                  <Button 
                    variant="default" 
                    className="bg-black hover:bg-gray-800"
                    onClick={() => onJoinAction(campaign.id, 'leave')}
                  >
                    Leave
                  </Button>
                ) : (
                  <Button 
                    variant="default" 
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => onJoinAction(campaign.id, 'join')}
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
                    onClick={onConfirmAction}
                  >
                    Confirm
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            {campaign.is_owner && (
              <Button
                variant="ghost"
                size="icon"
                className="bg-gold hover:bg-yellow-600"
                onClick={() => handleEditCampaign(campaign.id)}
              >
                <Pencil className="h-4 w-4 text-black" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="bg-forest-green hover:bg-green-700"
              onClick={() => handleViewCampaign(campaign.id)}
            >
              <Eye className="h-4 w-4 text-white" />
            </Button>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left">{campaign.owner_alias || 'N/A'}</TableCell>
        <TableCell className="font-medium text-left">{campaign.title}</TableCell>
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
            onClick={() => onToggleExpand(campaign.id)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={9} className="p-0">
            <div className="bg-gray-50 p-4">
              <SessionList campaignId={campaign.id} />
            </div>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};