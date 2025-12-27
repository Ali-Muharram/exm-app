"use client";
import React, { useState } from "react";
import z from "zod";
import ForgetPasswordForm from "@/app/auth/_components/forget-pass-form";
import { ForgotPasswordContext } from "@/app/auth/_hooks/forgot-password.context";
import { forgotPasswordSchema } from "@/lib/schemes/forgot-password.schema";
const VerifyOtpForm = React.lazy(() => import("@/app/auth/_components/verify-otp"));
const CreateNewPassword = React.lazy(() => import("@/app/auth/_components/create-new-password"));

export default function Page() {
  const [email, setEmail] = useState<z.infer<typeof forgotPasswordSchema>["email"]>("");
  const [stepNumber, setStepsNumber] = useState<number>(1);
  return (
    <section className="h-full w-full">
      <ForgotPasswordContext.Provider value={{ email, setEmail, stepNumber, setStepsNumber }}>
        {/*  -------------------------------- step one -------------------------------------------------  */}
        {stepNumber === 1 && <ForgetPasswordForm />}
        {/*  -------------------------------- step two verift otp --------------------------------------  */}
        {stepNumber === 2 && <VerifyOtpForm />}
        {/*  -------------------------------- step three change password -------------------------------  */}
        {stepNumber === 3 && <CreateNewPassword />}
      </ForgotPasswordContext.Provider>
    </section>
  );
}
