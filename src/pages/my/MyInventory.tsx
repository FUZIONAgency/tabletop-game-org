import PageLayout from "@/components/PageLayout";
import { Package } from "lucide-react";

const MyInventory = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-2 mb-8">
          <Package className="w-6 h-6" />
          <h1 className="text-3xl font-bold">My Inventory</h1>
        </div>
        <p className="text-gray-600">Manage your inventory items.</p>
      </div>
    </PageLayout>
  );
};

export default MyInventory;