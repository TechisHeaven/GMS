import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import Root from "./layout/root";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import TrackingPage from "./pages/TrackingPage";
import ProductsPage from "./pages/ProductsPage";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/LoginPage";
import AuthLayout from "./layout/AuthLayout";
import Loader from "./components/Loader/Loader";
import StorePage from "./pages/StorePage";

export let router = createBrowserRouter([
  {
    path: "/",
    loader: Loader,
    Component: Root,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/products",
        Component: ProductsPage,
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
        path: "/store/:id",
        Component: StorePage,
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
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    loader: Loader,
    children: [
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
    ],
  },
  {
    path: "*",
    Component: PageNotFoundPage,
  },
]);
