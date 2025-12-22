import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/components/_layout/auth.layout";

// import Homepage from "../pages/Homepage";
import {
  Congratulations,
  CreateAccount,
  ForgetPassword,
  Login,
  ResetPassword,
  VerifyOtp,
  Dashboard,
  Orders,
  PreviewOrder,
  Customers,
  Settings,
  Profile,
  Admins,
  Payouts,
  Merchants,
  Notification,
  Riders,
  Complaints,
  ProductCategory,
  Pricing,
  // Products,
  // ProductPreview,
} from "@/pages";
import MainLayout from "@/components/_layout/main.layout";

const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      { path: "/", Component: Login },
      {
        path: "create-account",
        Component: CreateAccount,
      },
      {
        path: "verify-otp",
        Component: VerifyOtp,
      },
      {
        path: "congratulations",
        Component: Congratulations,
      },
      {
        path: "forgot-password",
        Component: ForgetPassword,
      },
      {
        path: "reset-password",
        Component: ResetPassword,
      },
      {
        path: "reset-otp",
        Component: VerifyOtp,
      },
    ],
  },
  {
    path: "",
    Component: MainLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            Component: Orders,
          },
          {
            path: ":id",
            Component: PreviewOrder,
          },
        ],
      },
      {
        path: "customers",
        children: [
          {
            path: "",
            Component: Customers,
          },
        ],
      },
      {
        path: "riders",
        Component: Riders,
      },
      {
        path: "payouts",
        Component: Payouts,
      },
      {
        path: "notifications",
        Component: Notification,
      },
      {
        path: "merchants",
        children: [
          {
            path: "",
            Component: Merchants,
          },
          {
            path: ":id/products",
            // Component: Products,
          },
        ],
      },
      {
        path: "products/:id",
        // Component: ProductPreview,
      },
      {
        path: "settings",
        Component: Settings,
        children: [
          {
            path: "",
            Component: Profile,
          },
          {
            path: "admins",
            Component: Admins,
          },
          {
            path: "product_category",
            Component: ProductCategory,
          },
          {
            path: "pricing",
            Component: Pricing,
          },
        ],
      },
      {
        path: "complaints",
        Component: Complaints,
      },
    ],
  },
]);

export default router;
