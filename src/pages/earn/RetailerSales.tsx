import Navigation from "@/components/Navigation";
import { DollarSign } from "lucide-react";

const RetailerSales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex items-center gap-2 mb-8">
            <DollarSign className="w-6 h-6" />
            <h1 className="text-3xl font-bold">Retailer Sales</h1>
          </div>
          <p className="text-gray-600">Monitor your retailer sales performance.</p>
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

export default RetailerSales;