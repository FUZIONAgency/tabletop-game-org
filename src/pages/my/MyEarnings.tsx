import PageLayout from "@/components/PageLayout";
import { DollarSign } from "lucide-react";

const MyEarnings = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-2 mb-8">
          <DollarSign className="w-6 h-6" />
          <h1 className="text-3xl font-bold">My Earnings</h1>
        </div>
        <p className="text-gray-600">Track and manage your earnings.</p>
      </div>
    </PageLayout>
  );
};

export default MyEarnings;