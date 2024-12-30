import { cn } from "@/lib/utils";

interface SponsorRequestCardProps {
  hasPendingRequest: boolean;
}

export const SponsorRequestCard = ({ hasPendingRequest }: SponsorRequestCardProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg text-white text-center min-w-[150px]",
        hasPendingRequest ? "bg-[#8B7355]" : "bg-blue-600 hover:bg-blue-700"
      )}
    >
      {hasPendingRequest ? "In Review" : "Request a Sponsor"}
    </div>
  );
};