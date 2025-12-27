"use client";
import { ChevronLeft } from "lucide-react";
import React, { useContext } from "react";
import { DashboardHeaderContext } from "../hooks/dashboard.context";
import { useRouter } from "next/navigation";
export default function Heading() {
  const router = useRouter();
  const { headerData } = useContext(DashboardHeaderContext);

  return (
    <section className="flex w-full gap-2.5">
      {headerData.undo && (
        <button
          onClick={() => router.back()}
          className="flex w-9 items-center justify-center border border-primary text-primary"
        >
          <ChevronLeft />
        </button>
      )}

      <div className="flex w-full items-center gap-4 bg-primary p-4 text-white">
        {headerData.Icon && <headerData.Icon className="h-11 w-11" />}
        <p className="font-inter text-[2rem] font-semibold">{headerData.title}</p>
      </div>
    </section>
  );
}
