import { Trees } from "lucide-react";
import { NetworkTree } from "../network/NetworkTree";

const NetworkSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2">
        <Trees className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Your Network</h3>
      </div>
      <div className="flex justify-center">
        <NetworkTree />
      </div>
    </div>
  );
};

export default NetworkSection;