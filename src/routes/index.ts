import { createBrowserRouter } from "react-router";
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
  Customers,
  Orders,
  PreviewCustomer,
  Settings,
  Profile,
  Admins,
  Payouts,
  PreviewOrder,
  Merchants,
  MerchantPreview,
  Products,
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
        path: "customers",
        children: [
          {
            path: "",
            Component: Customers,
          },
          {
            path: ":id",
            Component: PreviewCustomer,
          },
        ],
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
        path: "payouts",
        Component: Payouts,
      },
      {
        path: "merchants",
        children: [
          {
            path: "",
            Component: Merchants,
          },
          {
            path: ":id",
            Component: MerchantPreview,
          },
          {
            path: ":id/products",
            Component: Products,
          },
          // {
          //   path: "new",
          //   Component: AddProduct,
          // },
        ],
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
        ],
      },
    ],
  },
]);

export default router;
