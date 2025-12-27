"use client"
import React from "react";
import ListExams from "./_components/list-exams";
import { useHeader } from "../hooks/header.hook";
import { BookOpenCheck } from "lucide-react";

export default function Page() {
   useHeader({
      title: "Exams",
      Icon: BookOpenCheck,
      undo: true,
    });
  return <ListExams />;
}
