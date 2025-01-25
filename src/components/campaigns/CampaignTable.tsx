import React, { useState } from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { Campaign } from "@/types/campaign";
import { CampaignTableHeader } from "./table/CampaignTableHeader";
import { CampaignTableRow } from "./table/CampaignTableRow";

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
      <CampaignTableHeader />
      <TableBody>
        {campaigns.map((campaign) => (
          <CampaignTableRow
            key={campaign.id}
            campaign={campaign}
            isExpanded={expandedCampaigns.includes(campaign.id)}
            onToggleExpand={toggleExpand}
            onJoinAction={handleActionClick}
            isDialogOpen={isDialogOpen}
            selectedCampaignId={selectedCampaignId}
            dialogAction={dialogAction}
            onConfirmAction={handleConfirmAction}
            setIsDialogOpen={setIsDialogOpen}
          />
        ))}
      </TableBody>
    </Table>
  );
};