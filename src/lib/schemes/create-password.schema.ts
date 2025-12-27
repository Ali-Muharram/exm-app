import { z } from "zod";

export const CreatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-).",
      }),

    rePassword: z.string().min(8, { message: "Please re-enter your password." }),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });
