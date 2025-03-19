import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import Root from "./layout/root";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import TrackingPage from "./pages/TrackingPage";
import CategoriesPage from "./pages/CategoriesPage";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";

export let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/category/:id?",
        Component: CategoriesPage,
      },
      {
        path: "/checkout",
        Component: CheckoutPage,
      },
      {
        path: "/product/:id",
        Component: ProductPage,
      },
      {
        path: "/cart",
        Component: CartPage,
      },
      {
        path: "/profile",
        Component: ProfilePage,
      },
      {
        path: "/track/:id",
        Component: TrackingPage,
      },
      {
        path: "/confirm-order/:id",
        Component: OrderConfirmedPage,
      },
      {
        path: "*",
        Component: PageNotFoundPage,
      },
    ],
  },
]);
