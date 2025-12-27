"use client";
import React from "react";
import { HeaderProvider } from "@/components/providers/dashboard/_components/header.provider";

export default function DashboardProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return <HeaderProvider>{children}</HeaderProvider>;
}
