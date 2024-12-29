import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import MyProducts from "@/pages/profile/MyProducts";
import MyGames from "@/pages/profile/MyGames";
import MyTeam from "@/pages/profile/MyTeam";
import MyEarnings from "@/pages/profile/MyEarnings";
import ProductSales from "@/pages/earn/ProductSales";
import Overrides from "@/pages/earn/Overrides";
import ConventionSales from "@/pages/earn/ConventionSales";
import RetailerSales from "@/pages/earn/RetailerSales";
import PaidGames from "@/pages/earn/PaidGames";
import Products from "@/pages/earn/Products";
import ProductDetail from "@/pages/earn/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/products",
    element: <MyProducts />,
  },
  {
    path: "/profile/games",
    element: <MyGames />,
  },
  {
    path: "/profile/team",
    element: <MyTeam />,
  },
  {
    path: "/profile/earnings",
    element: <MyEarnings />,
  },
  {
    path: "/earn/product-sales",
    element: <ProductSales />,
  },
  {
    path: "/earn/overrides",
    element: <Overrides />,
  },
  {
    path: "/earn/convention-sales",
    element: <ConventionSales />,
  },
  {
    path: "/earn/retailer-sales",
    element: <RetailerSales />,
  },
  {
    path: "/earn/paid-games",
    element: <PaidGames />,
  },
  {
    path: "/earn/products",
    element: <Products />,
  },
  {
    path: "/earn/products/:id",
    element: <ProductDetail />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;