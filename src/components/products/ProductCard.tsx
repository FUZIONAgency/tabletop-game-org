import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const basePrice = product.base_price;
  const lowestPrice = Math.min(...product.skus.map((sku: any) => sku.price));
  const highestPrice = Math.max(...product.skus.map((sku: any) => sku.price));

  return (
    <Link to={`/earn/products/${product.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        </CardContent>
        <CardFooter className="px-4 pb-4">
          {lowestPrice === highestPrice ? (
            <p className="text-lg font-semibold">${lowestPrice.toFixed(2)}</p>
          ) : (
            <p className="text-lg font-semibold">
              ${lowestPrice.toFixed(2)} - ${highestPrice.toFixed(2)}
            </p>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;