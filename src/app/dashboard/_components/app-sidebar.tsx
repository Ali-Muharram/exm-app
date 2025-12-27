"use client";
import * as React from "react";
import { NavMain } from "@/app/dashboard/_components/nav-main";
import { NavUser } from "@/app/dashboard/_components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import Image from "next/image";
import ProjectName from "@/components/shared/project-name";
import { DashBoardSideBar } from "@/lib/constants/dashboard-sidebar.constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex h-full flex-col">
        <SidebarHeader>
          <Image className="h-9 w-48" src="/assets/logo.png" width="192" height="37" alt="logo" />
          <div className="h-8">
            <ProjectName />
          </div>
        </SidebarHeader>

        <SidebarContent className="mt-14 h-full">
          <NavMain items={DashBoardSideBar.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </div>
    </Sidebar>
  );
}
