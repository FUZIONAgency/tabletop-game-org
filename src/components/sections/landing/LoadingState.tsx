import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-white p-6 space-y-8">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-[60vh] w-full" />
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
};

export default LoadingState;