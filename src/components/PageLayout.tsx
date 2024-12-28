import Navigation from "./Navigation";
import Footer from "./Footer";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;