import { z } from "zod";

export const RegisterSchema = z
  .object({
    firstName: z.string().min(2, { message: "firstName must be at least 2 characters long." }),
    lastName: z.string().min(2, { message: "lastName must be at least 2 characters long." }),
    username: z.string().min(2, { message: "Username must be at least 2 characters long." }),

    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(11, { message: "Phone number is required." }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-).",
      }),

    rePassword: z.string().min(8, { message: "Please re-enter your password." }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });
