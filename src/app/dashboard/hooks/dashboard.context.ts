import { HeaderDashboardState } from "@/lib/types/dashboard";
import { createContext } from "react";

/* ---------------------------------- types --------------------------------- */

type DashboardHeaderContextType = {
  headerData: HeaderDashboardState;
  setHeaderData: React.Dispatch<React.SetStateAction<HeaderDashboardState>>;
};

/* --------------------------------- creat context -------------------------------- */
export const DashboardHeaderContext = createContext<DashboardHeaderContextType>({} as DashboardHeaderContextType);
