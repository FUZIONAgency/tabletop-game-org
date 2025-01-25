import Navigation from "./Navigation";
import Footer from "./Footer";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "./ui/skeleton";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { isLoading, user } = useAuth();

  // Only show skeleton for a brief moment to prevent infinite loading state
  if (isLoading) {
    console.log("Auth loading state:", { isLoading, user });
    setTimeout(() => {
      if (isLoading) {
        console.log("Auth loading timeout reached - still loading after 2s");
      }
    }, 2000);
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