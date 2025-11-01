import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/molecules/partials/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { CustomDrawer } from "../molecules/CustomDrawer";

const MainLayout = () => {
  const { user } = useAuthStore();
  const nav = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token && user === null) {
      nav("/", { replace: true });
    }
  }, [user, nav]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#FBFBFC]">
        <div className="sticky bottom-0 top-0 z-50">
          <SiteHeader />
        </div>
        <div className="p-5 md:p-10 lg:p-12  xl:p-14 2xl:p-20">
          <Outlet />
        </div>
        <CustomDrawer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
