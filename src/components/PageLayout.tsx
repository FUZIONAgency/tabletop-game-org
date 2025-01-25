import Navigation from "./Navigation";
import Footer from "./Footer";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "./ui/skeleton";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { isLoading } = useAuth();

  // Only show skeleton for a brief moment to prevent infinite loading state
  if (isLoading) {
    setTimeout(() => {
      console.log("Auth loading timeout reached");
    }, 2000); // Log if loading takes more than 2 seconds
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navigation />
      <main className="flex-grow relative z-0 pt-16">
        {isLoading ? (
          <div className="container mx-auto px-4 space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;