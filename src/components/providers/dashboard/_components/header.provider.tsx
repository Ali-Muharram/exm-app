"use client";
import { HeaderDashboardState } from "@/lib/types/dashboard";
import { useState } from "react";
import { DashboardHeaderContext } from "@/app/dashboard/hooks/dashboard.context";

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerData, setHeaderData] = useState<HeaderDashboardState>({} as HeaderDashboardState);
  return <DashboardHeaderContext.Provider value={{ headerData, setHeaderData }}>{children}</DashboardHeaderContext.Provider>;
}
