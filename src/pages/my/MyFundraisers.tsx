import PageLayout from "@/components/PageLayout";
import { Gift } from "lucide-react";

const MyFundraisers = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-2 mb-8">
          <Gift className="w-6 h-6" />
          <h1 className="text-3xl font-bold">My Fundraisers</h1>
        </div>
        <p className="text-gray-600">Manage your fundraising campaigns.</p>
      </div>
    </PageLayout>
  );
};

export default MyFundraisers;