import { createContext } from "react";
import { forgotPasswordSchema } from "@/lib/schemes/forgot-password.schema";
import z from "zod";

/* ---------------------------------- types --------------------------------- */
type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

type ForgotPasswordContextType = {
  email: ForgotPasswordForm["email"] | null;
  setEmail: React.Dispatch<React.SetStateAction<ForgotPasswordForm["email"]>>;

  stepNumber: number;
  setStepsNumber: React.Dispatch<React.SetStateAction<number>>;
};
/* --------------------------------- context -------------------------------- */
export const ForgotPasswordContext = createContext<ForgotPasswordContextType>({} as ForgotPasswordContextType);
