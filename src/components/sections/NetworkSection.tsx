import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Trees, UserPlus2 } from "lucide-react";
import { Card } from "../ui/card";

interface NetworkNode {
  id: string;
  alias: string;
  children: NetworkNode[];
}

const NetworkSection = () => {
  const [network, setNetwork] = useState<NetworkNode | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNetwork = async () => {
      // This is a placeholder - implement actual network fetching logic
      const mockNetwork = {
        id: "sponsor",
        alias: "Sponsor",
        children: [
          {
            id: "root",
            alias: "You",
            children: [
              {
                id: "left",
                alias: "Left Team",
                children: [],
              },
              {
                id: "right",
                alias: "Right Team",
                children: [],
              },
            ],
          },
        ],
      };
      setNetwork(mockNetwork);
    };

    fetchNetwork();
  }, [user]);

  const renderNode = (node: NetworkNode) => {
    return (
      <div key={node.id} className="flex flex-col items-center relative">
        <Card className="p-4 mb-4 w-32 text-center relative z-10 bg-white">
          <p className="font-medium">{node.alias}</p>
        </Card>
        {node.children.length > 0 && (
          <>
            {/* Vertical line from parent to children */}
            <div className="w-[2px] h-8 border-l-2 border-dashed border-gray-300" />
            
            {/* Container for children */}
            <div className="flex gap-8 mt-4 relative">
              {/* Horizontal line connecting children */}
              {node.children.length > 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 h-[2px] border-t-2 border-dashed border-gray-300" style={{ width: 'calc(100% - 2rem)' }} />
              )}
              {node.children.map((child) => renderNode(child))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2">
        <Trees className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Your Network</h3>
      </div>
      <div className="flex justify-center">
        {network && renderNode(network)}
      </div>
    </div>
  );
};

export default NetworkSection;