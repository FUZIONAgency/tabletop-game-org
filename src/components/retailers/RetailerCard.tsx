import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RetailerCardProps {
  retailer: any;
  distance?: number;
  onLink: (retailerId: string) => void;
}

export const RetailerCard = ({ retailer, distance, onLink }: RetailerCardProps) => {
  return (
    <Card>
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
          className="w-full bg-gold hover:bg-yellow-500 text-black"
        >
          Link Retailer
        </Button>
      </CardContent>
    </Card>
  );
};