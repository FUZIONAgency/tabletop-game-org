import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth";
import SKUSelector from "@/components/products/SKUSelector";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          skus (
            id,
            sku_code,
            price,
            inventory_quantity,
            sku_attributes (
              attribute_values (
                value,
                attribute_id,
                product_attributes (name)
              )
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: customerPrices } = useQuery({
    queryKey: ['customer-prices', id, user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('customer_prices')
        .select('*')
        .eq('customer_id', user.id)
        .in('sku_id', product?.skus?.map(sku => sku.id) || []);

      if (error) throw error;
      return data;
    },
    enabled: !!user && !!product,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-8 w-2/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <SKUSelector 
              skus={product.skus} 
              customerPrices={customerPrices || []}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProductDetail;