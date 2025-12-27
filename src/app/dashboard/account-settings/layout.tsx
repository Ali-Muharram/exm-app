"use client";
import React from "react";
import { AccountSettingsSideBar } from "@/lib/constants/account-settings-sidebar.constant";
import { useHeader } from "../hooks/header.hook";
import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
export default function Layout({ children }: { children: React.ReactNode }) {
  useHeader({
    title: "Account Settings",
    Icon: UserRound,
    undo: true,
  });
  const pathname = usePathname();
  return (
    <section className="h-dull flex h-full w-full gap-6">
      {/* -------------------------------- sidebar --------------------------------  */}
      <div className="flex w-[17.63rem] flex-col bg-white p-6">
        <div className="flex h-full w-full flex-col gap-2.5 text-muted-forground">
          {AccountSettingsSideBar.map((item) => (
            <Link
              href={item.url}
              className={` ${pathname.includes(item.url) ? "border-primary bg-outline text-primary" : "border-transparent text-muted-forground"} flex w-full items-center gap-2.5 px-4 py-2.5`}
              key={item.id}
            >
              <item.Icon className="h-6 w-6" />
              <p className="text-nowrap text-base font-normal">{item.title}</p>
            </Link>
          ))}
        </div>
        <button
          onClick={() => {
            signOut();
          }}
          className={`flex w-full items-center gap-2.5 bg-red-50 hover:bg-red-100 px-4 py-2.5 text-destructive`}
        >
          <LogOut className="h-6 w-6 rotate-180" />
          <p className="text-nowrap text-base font-normal">Logout</p>
        </button>
      </div>
      {/*  ---------------------------------- pages ---------------------------------  */}
      <div className="h-full w-full bg-white p-6">{children}</div>
    </section>
  );
}
