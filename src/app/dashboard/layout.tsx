import { AppSidebar } from "@/app/dashboard/_components/app-sidebar";
import BreadcrumbHeader from "@/app/dashboard/_components/breadcrumb";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Heading from "@/app/dashboard/_components/heading";
import DashboardProviders from "@/components/providers/dashboard";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar className="w-[22.63rem] space-y-16 bg-outline p-10" />
      <SidebarInset>
        <header className="flex shrink-0 items-center gap-2 bg-card p-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="bg flex items-center gap-2 px-4">
            {/* <SidebarTrigger className="-ml-1" /> */}
            {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbHeader />
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <DashboardProviders>
          <div className="flex h-dvh flex-1 flex-col gap-4 p-6">
            <Heading />
            {children}
          </div>
        </DashboardProviders>
      </SidebarInset>
    </SidebarProvider>
  );
}
