import NetworkSection from "@/components/sections/NetworkSection";
import InvitesSection from "@/components/sections/InvitesSection";
import Navigation from "@/components/Navigation";

const Network = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 pt-24 pb-12">
          <NetworkSection />
          <InvitesSection />
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} TabletopGame.org. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Network;