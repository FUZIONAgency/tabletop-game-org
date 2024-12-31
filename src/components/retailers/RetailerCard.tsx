import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RetailerCardProps {
  retailer: any;
  distance?: number;
  onLink: (retailerId: string) => void;
  onUnlink?: (retailerId: string) => void;
  isLinked?: boolean;
}

export const RetailerCard = ({ retailer, distance, onLink, onUnlink, isLinked }: RetailerCardProps) => {
  return (
    <Card className="relative">
      {retailer.store_photo && (
        <img
          src={retailer.store_photo}
          alt={retailer.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <CardHeader>
        <CardTitle>{retailer.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{retailer.description}</p>
        <p className="text-sm text-gray-500 mb-4">
          {retailer.address}, {retailer.city}, {retailer.state}
        </p>
        {typeof distance === 'number' && (
          <p className="text-sm text-gray-500 mb-4">
            Distance: {distance.toFixed(1)} miles
          </p>
        )}
        <Button
          onClick={() => onLink(retailer.id)}
          className={`w-full ${
            isLinked 
              ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' 
              : 'bg-gold hover:bg-yellow-500 text-black'
          }`}
          disabled={isLinked}
        >
          {isLinked ? 'Already Linked' : 'Link Retailer'}
        </Button>
        {isLinked && onUnlink && (
          <Button
            onClick={() => onUnlink(retailer.id)}
            className="absolute bottom-4 right-4 p-2 bg-gold hover:bg-yellow-500 text-black"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};