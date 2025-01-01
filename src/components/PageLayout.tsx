import Navigation from "./Navigation";
import Footer from "./Footer";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navigation />
      <main className="flex-grow relative z-0 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;