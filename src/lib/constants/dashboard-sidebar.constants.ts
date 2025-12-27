import { GraduationCap, UserRound } from "lucide-react";

export const DashBoardSideBar = {
  navMain: [
    {
      id: 1,
      title: "Diplomas",
      url: "/dashboard",
      label: ["exams"],
      icon: GraduationCap,
      isActive: true,
    },
    {
      id: 2,
      title: "Account Settings",
      url: "/dashboard/account-settings",
      label: [],
      icon: UserRound,
    },
  ],
};
