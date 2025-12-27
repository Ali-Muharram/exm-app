"use client";
import ListDiplomas from "./_components/list-diplomas";
import { useHeader } from "../hooks/header.hook";
import { GraduationCap } from "lucide-react";

export default function Deplomas() {
  useHeader({
    title: "Deplomas",
    Icon: GraduationCap,
  });
  return (
    <section>
      <ListDiplomas />
    </section>
  );
}
