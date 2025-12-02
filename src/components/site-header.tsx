import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Bell } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { Link } from "react-router";
import logo from "@/assets/images/logo.svg";

export function SiteHeader() {
  const { user } = useAuthStore();
  return (
    <header className="bg-white flex p-2 md:py-5 md:pr-6  h-(--header-height) shrink-0 items-center gap-2 border-b border-border-gray transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-2 sm:px-4 lg:gap-2 lg:px-12  xl:px-14  2xl:px-20">
        {
          <div className="flex gap-1 md:hidden items-center">
            <SidebarTrigger />

            <Link to="/dashboard">
              <img src={logo} className=" size-12" />
            </Link>
          </div>
        }
        {/* <h1 className="text-base font-medium">Documents</h1> */}
        <div className="ml-auto flex items-center gap-2">
          <button className="relative bg-[#F6F6F6] p-2 md:p-3 rounded-md hover:bg-primary cursor-pointer group">
            <Bell className="size-4 sm:size-6 group-hover:text-white" />

            <span className="bg-[#EA3030] absolute top-1 right-1 sm:top-1.5 sm:right-1 text-white text-[0.585rem] flex justify-center items-center font-medium rounded-[2px]  w-3.5 h-3">
              8
            </span>
          </button>

          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-10"
          />

          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <>
              <Avatar className=" sm:size-10 lg:size-12 rounded-lg grayscale">
                <AvatarImage src={user?.profilePics} alt={"profile picture"} />
                <AvatarFallback className="rounded-md font-bold md:text-lg">
                  {user?.name.split(" ")[0]?.split("")[0]}
                  {""}
                  {user?.name.split(" ")[1]?.split("")[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium capitalize md:text-base">
                  {user?.name}
                </span>
                <span className="truncate md:text-xs text-[#727272]">
                  {user?.role}
                </span>
              </div>
            </>
          </Button>
        </div>
      </div>
    </header>
  );
}
