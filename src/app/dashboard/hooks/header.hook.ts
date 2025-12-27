/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { DashboardHeaderContext } from "../hooks/dashboard.context";
import { HeaderDashboardState } from "@/lib/types/dashboard";

export function useHeader({ ...props }: HeaderDashboardState) {
  const { setHeaderData } = useContext(DashboardHeaderContext);

  useEffect(() => {
    setHeaderData(props);
  }, []);
}
