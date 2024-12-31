import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const RetailerDetail = () => {
  const { id } = useParams();

  const { data: retailer, isLoading, error } = useQuery({
    queryKey: ['retailer', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('retailers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 pt-24 pb-12">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                There was an error loading the retailer details. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : retailer ? (
            <div>
              {retailer.store_photo && (
                <img
                  src={retailer.store_photo}
                  alt={retailer.name}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl font-bold mb-4">{retailer.name}</h1>
              <p className="text-gray-600 mb-4">{retailer.description}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                <p className="text-gray-600">{retailer.address}</p>
                <p className="text-gray-600">{retailer.city}, {retailer.state} {retailer.zip}</p>
                {retailer.phone && <p className="text-gray-600">Phone: {retailer.phone}</p>}
                {retailer.email && <p className="text-gray-600">Email: {retailer.email}</p>}
                {retailer.website_url && (
                  <a 
                    href={retailer.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Retailer not found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RetailerDetail;