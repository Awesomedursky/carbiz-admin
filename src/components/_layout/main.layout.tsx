import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/molecules/partials/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

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
        <div className="p-5 md:p-10">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
