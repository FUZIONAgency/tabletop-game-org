import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const CampaignTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px]"></TableHead>
        <TableHead className="text-left">Owner</TableHead>
        <TableHead className="text-left">Title</TableHead>
        <TableHead>Game System</TableHead>
        <TableHead>Players</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Created</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
  );
};