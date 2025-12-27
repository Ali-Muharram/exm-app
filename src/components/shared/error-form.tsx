import { TypeErrorForm } from "@/lib/types/error-form-";
import { CircleX } from "lucide-react";
import React from "react";

export default function ErrorForm({
  setError,
  messages,
}: {
  setError?: React.Dispatch<React.SetStateAction<TypeErrorForm>>;
  messages: TypeErrorForm["message"];
}) {
  return (
    <section className="relative flex items-center justify-center border border-destructive bg-red-50 p-2.5 text-destructive">
      <button
        onClick={() => {
          if (setError) setError({ status: false, message: "" });
        }}
        className="absolute -top-2.5 cursor-pointer"
        type="button"
      >
        <CircleX className="h-[1.13rem] w-[1.13rem]" />
      </button>
      <p className="text-sm font-normal">{messages}</p>
    </section>
  );
}
