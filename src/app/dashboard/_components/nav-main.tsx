"use client";

import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    id: number;
    title: string;
    url: string;
    label: string[];
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-2.5">
        {items.map((item, index) => (
          <Link key={item.id} href={item.url}>
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className={` ${
                (
                  index == 0
                    ? pathname == item.url
                      ? true
                      : item.label.some((i) => pathname.includes(i))
                    : pathname.includes(item.url)
                )
                  ? "border-primary bg-outline-hover text-primary"
                  : "border-transparent text-muted-forground"
              } group/collapsible flex h-14 items-center border p-2.5 text-base font-normal`}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="space-x-1" tooltip={item.title}>
                    {item.icon && <item.icon className="h-6 w-6" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
