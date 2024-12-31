import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RetailerSearchControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rangeInMiles: string;
  onRangeChange: (value: string) => void;
  onRangeUpdate: () => void;
}

export const RetailerSearchControls = ({
  searchQuery,
  onSearchChange,
  rangeInMiles,
  onRangeChange,
  onRangeUpdate,
}: RetailerSearchControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search by name, city, or state..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Range in miles..."
          value={rangeInMiles}
          onChange={(e) => onRangeChange(e.target.value)}
          className="w-32"
        />
        <Button 
          onClick={onRangeUpdate}
          className="bg-gold hover:bg-yellow-500 text-black whitespace-nowrap"
        >
          Range in Miles
        </Button>
      </div>
    </div>
  );
};