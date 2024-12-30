import { cn } from "@/lib/utils";

interface SponsorRequestCardProps {
  hasPendingRequest: boolean;
  onClick?: () => void;
}

export const SponsorRequestCard = ({ hasPendingRequest, onClick }: SponsorRequestCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg cursor-pointer text-white text-center min-w-[150px]",
        hasPendingRequest ? "bg-[#8B7355]" : "bg-blue-600 hover:bg-blue-700"
      )}
    >
      {hasPendingRequest ? "In Review" : "Request a Sponsor"}
    </div>
  );
};