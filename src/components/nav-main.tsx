import { type Icon } from "@tabler/icons-react";
import { LucideIcon } from "lucide-react";
import { type Icon as PhosporIcon } from "@phosphor-icons/react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: PhosporIcon | LucideIcon | Icon;
  }[];
}) {
  const router = useNavigate();
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 mt-5">
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(item.url + "/");

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => router(item.url)}
                  isActive={isActive}
                  className="py-5.5 hover:bg-primary/90 group hover:text-primary-foreground active:bg-primary active:text-primary-foreground duration-300 ease-linear flex items-center gap-2 text-[#4F4C55]"
                >
                  {item.icon && <item.icon className="text-2xl" />}
                  <span className="text-base font-[500]">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
