import { z } from "zod";

export const ProfileSchema = z.object({
  firstName: z.string().min(2, { message: "firstName must be at least 2 characters long." }),
  lastName: z.string().min(2, { message: "lastName must be at least 2 characters long." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters long." }),

  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(11, { message: "Phone number is required." }),
});
