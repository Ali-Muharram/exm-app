import z from "zod";

export const forgotPasswordOtpSchema = z.object({
  resetCode: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits." })
    .regex(/^\d{6}$/, { message: "Please enter a valid 6-digit OTP." }),
});
