import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Tree, UserPlus2 } from "lucide-react";
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
      };
      setNetwork(mockNetwork);
    };

    fetchNetwork();
  }, [user]);

  const renderNode = (node: NetworkNode) => {
    return (
      <div key={node.id} className="flex flex-col items-center">
        <Card className="p-4 mb-4 w-32 text-center">
          <p className="font-medium">{node.alias}</p>
        </Card>
        {node.children.length > 0 && (
          <div className="flex gap-8 mt-4">
            {node.children.map((child) => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2">
        <Tree className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Your Network</h3>
      </div>
      <div className="flex justify-center">
        {network && renderNode(network)}
      </div>
    </div>
  );
};

export default NetworkSection;