import { CircleUserRound, Lock } from "lucide-react";

export const AccountSettingsSideBar = [
  {
    id: 1,
    title: "Profile",
    url: "/dashboard/account-settings/profile",
    Icon: CircleUserRound,
  },
  {
    id: 2,
    title: "Change Password",
    url: "/dashboard/account-settings/change-password",
    Icon: Lock,
  },
];
