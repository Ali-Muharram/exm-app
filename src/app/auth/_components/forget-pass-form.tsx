"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Loader2Icon, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ForgotPasswordContext } from "../_hooks/forgot-password.context";
import { forgotPasswordSchema } from "@/lib/schemes/forgot-password.schema";
import { useTimeResendOtp } from "@/app/auth/_hooks/time-reset-otp";
import { useGlobalMutations } from "@/hooks/global-mutation.hooks";
import type { ForgotPasswordRespone } from "@/lib/types/auth";

export default function ForgetPasswordForm() {
  const { email, setEmail, setStepsNumber } = useContext(ForgotPasswordContext);
  const { seconds, setTime, getStatus } = useTimeResendOtp();
  /* -------------------------------- mutation -------------------------------- */
  const mutation = useGlobalMutations<z.infer<typeof forgotPasswordSchema>, ForgotPasswordRespone>({
    url: "/api/v1/auth/forgotPassword",
    toastSuccess: true,
    toastError: true,
  });

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: email || "",
    },
  });
  /* -------------------------------- function -------------------------------- */
  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    const isAllowed = getStatus();
    if (!isAllowed) return;
    await mutation.mutateAsync(data);
    setTime();
    setEmail(data.email);
    setStepsNumber(2);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-[90%] flex-col justify-center lg:w-full lg:py-[341.28px]"
      >
        <div className="flex flex-col gap-4">
          <div className="space-y-2.5">
            {/*  ---------------------------------- title ----------------------------------  */}
            <h1 className="font-inter text-3xl font-bold">Forgot Password</h1>
            {/*  ---------------------------------- desc ----------------------------------  */}
            <p className="pb-6 text-base font-normal text-muted-forground">
              Don’t worry, we will help you recover your account.
            </p>
          </div>

          {/* ---------------------------------- email ---------------------------------  */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex flex-col gap-4">
            {/*  --------------------------------- submit ---------------------------------  */}
            <Button disabled={mutation.isPending} type="submit" className="w-full">
              {seconds > 0 && "Continue after : " + seconds}
              {seconds === 0 && "Continue "}

              <MoveRight className="h-4 w-4" />
              <Loader2Icon className={`${mutation.isPending ? "animate-spin" : "hidden"}`} />
            </Button>
            <p className="mx-auto mt-7 flex flex-col text-center text-sm font-medium text-muted-forground lg:flex-row">
              Don’t have an account?
              <Link className="px-2 text-primary" href={"/auth/register"}>
                Create yours
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
}
