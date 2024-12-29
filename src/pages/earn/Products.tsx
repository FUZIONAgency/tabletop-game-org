import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Loader } from "lucide-react";
import ProductFilter from "@/components/products/ProductFilter";
import ProductCard from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import PageLayout from "@/components/PageLayout";

const Products = () => {
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>({});
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', selectedAttributes],
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
        .eq('status', 'active');

      if (error) throw error;
      return data;
    },
  });

  if (error) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <p className="text-red-500">Error loading products. Please try again later.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {showFilters && (
          <div className="md:col-span-1">
            <ProductFilter 
              selectedAttributes={selectedAttributes}
              onAttributeChange={setSelectedAttributes}
            />
          </div>
        )}
        
        <div className={`${showFilters ? 'md:col-span-3' : 'md:col-span-4'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Products;