import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ProductFilterProps {
  selectedAttributes: Record<string, string[]>;
  onAttributeChange: (attributes: Record<string, string[]>) => void;
}

const ProductFilter = ({ selectedAttributes, onAttributeChange }: ProductFilterProps) => {
  const { data: attributes } = useQuery({
    queryKey: ['product-attributes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_attributes')
        .select(`
          *,
          attribute_values (*)
        `);

      if (error) throw error;
      return data;
    },
  });

  const handleAttributeChange = (attributeId: string, value: string) => {
    const currentValues = selectedAttributes[attributeId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    onAttributeChange({
      ...selectedAttributes,
      [attributeId]: newValues,
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">Filters</h3>
        {attributes?.map((attribute) => (
          <div key={attribute.id} className="mb-4">
            <h4 className="font-medium mb-2">{attribute.name}</h4>
            <div className="space-y-2">
              {attribute.attribute_values.map((value: any) => (
                <div key={value.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={value.id}
                    checked={selectedAttributes[attribute.id]?.includes(value.value)}
                    onCheckedChange={() => handleAttributeChange(attribute.id, value.value)}
                  />
                  <Label htmlFor={value.id}>{value.value}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProductFilter;