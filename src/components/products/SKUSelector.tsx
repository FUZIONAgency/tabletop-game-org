import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SKUSelectorProps {
  skus: any[];
  customerPrices: any[];
}

interface SKUAttributes {
  [key: string]: string;
}

const SKUSelector = ({ skus, customerPrices }: SKUSelectorProps) => {
  const [selectedSKU, setSelectedSKU] = useState(skus[0]?.id);

  const getCustomerPrice = (skuId: string) => {
    return customerPrices.find(cp => cp.sku_id === skuId)?.price;
  };

  const groupAttributesBySKU = (sku: any): SKUAttributes => {
    return sku.sku_attributes.reduce((acc: SKUAttributes, attr: any) => {
      const { value, product_attributes } = attr.attribute_values;
      return { ...acc, [product_attributes.name]: value };
    }, {});
  };

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedSKU} onValueChange={setSelectedSKU}>
        {skus.map((sku) => {
          const attributes = groupAttributesBySKU(sku);
          const customerPrice = getCustomerPrice(sku.id);
          
          return (
            <Card key={sku.id} className="mb-2">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={sku.id} id={sku.id} />
                  <Label htmlFor={sku.id} className="flex-grow">
                    <div className="flex justify-between items-center">
                      <div>
                        {Object.entries(attributes).map(([name, value]) => (
                          <span key={name} className="mr-4">
                            {name}: {value}
                          </span>
                        ))}
                      </div>
                      <div className="text-right">
                        {customerPrice ? (
                          <div>
                            <span className="text-sm line-through text-gray-400">
                              ${sku.price.toFixed(2)}
                            </span>
                            <span className="ml-2 text-lg font-semibold text-green-600">
                              ${customerPrice.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-semibold">
                            ${sku.price.toFixed(2)}
                          </span>
                        )}
                        <div className="text-sm text-gray-600">
                          {sku.inventory_quantity} in stock
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default SKUSelector;