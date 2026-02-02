import * as React from "react";
import {
  HouseSimple,
  HandCoins,
  Gear,
  Bus,
  Notification,
} from "@phosphor-icons/react";
import { LogOut, ShoppingBag, UserPenIcon, UsersRound } from "lucide-react";

import { IconCoins } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router";

import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/hooks/Toast";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HouseSimple,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ShoppingBag,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: UsersRound,
    },
    {
      title: "Merchants",
      url: "/merchants",
      icon: IconCoins,
    },
    {
      title: "Riders",
      url: "/riders",
      icon: Bus,
    },
    {
      title: "Payouts",
      url: "/payouts",
      icon: HandCoins,
    },
    {
      title: "Complaints",
      url: "/complaints",
      icon: UserPenIcon,
    },
    {
      title: "Notification Center",
      url: "/notifications",
      icon: Notification,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Gear,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = React.useState<boolean>(false);
  const { handleSuccess } = useToast();
  const { user } = useAuthStore();
  const check = user?.adminAccess.toLowerCase() !== "sub_admin";

  const newNavlist = !check
    ? data.navMain?.filter((i) => i.title.toLowerCase() !== "payouts")
    : data?.navMain;

  const nav = useNavigate();

  const onLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      nav("/");
      handleSuccess("Admin Logged out successfully");
      logout();
    }, 1000);
  };
  return (
    <Sidebar backgroundColor="bg-white" {...props} className="">
      <SidebarHeader className="flex  gap-2 pt-5 md:pt-10 h-auto px-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-between items-center-safe ">
            {/* <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 flex"
            > */}
            <Link to="/dashboard">
              <img src={logo} />
            </Link>
            {/* </SidebarMenuButton> */}
            {/* <div className="flex gap-1 md:hidden items-center"> */}
            <SidebarTrigger className="md:hidden " />
            {/* </div> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={newNavlist} />
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          className="justify-start text-[#4F4C55] text-base"
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="size-4" />
          {isLoggingOut ? "Loading..." : "Logout"}
        </Button>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
