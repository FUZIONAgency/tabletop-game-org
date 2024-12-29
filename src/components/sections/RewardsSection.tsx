import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

const RewardsSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
          alt="Rewards"
          className="rounded-lg shadow-2xl"
        />
      </div>
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">There are Many Ways to Earn</h3>
        <ul className="space-y-4">
          {[
            "Commissions on Product Sales",
            "Recruitment Override Commissions",
            "Convention Rewards",
            "Retailer Incentives",
            "Paid Online Games",
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Button className="bg-gold hover:bg-gold/90 text-black">
          Start Earning
        </Button>
      </div>
    </div>
  );
};

export default RewardsSection;