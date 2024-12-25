import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const HelpSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 order-2 md:order-1">
        <h3 className="text-2xl font-semibold">24/7 Support</h3>
        <p className="text-gray-600">
          Our dedicated support team is always ready to assist you with any
          questions about gaming, rewards, or business opportunities.
        </p>
        <Button variant="outline">
          <HelpCircle className="mr-2 h-4 w-4" /> Get Help
        </Button>
      </div>
      <div className="relative order-1 md:order-2">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          alt="Support"
          className="rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default HelpSection;