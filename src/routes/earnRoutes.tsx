import ConventionSales from "@/pages/earn/ConventionSales";
import Overrides from "@/pages/earn/Overrides";
import PaidGames from "@/pages/earn/PaidGames";
import ProductSales from "@/pages/earn/ProductSales";
import RetailerSales from "@/pages/earn/RetailerSales";

export const earnRoutes = [
  { path: "/earn/product-sales", element: <ProductSales /> },
  { path: "/earn/overrides", element: <Overrides /> },
  { path: "/earn/convention-sales", element: <ConventionSales /> },
  { path: "/earn/retailer-sales", element: <RetailerSales /> },
  { path: "/earn/paid-games", element: <PaidGames /> },
];