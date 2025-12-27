"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import ErrorForm from "@/components/shared/error-form";
import type { TypeErrorForm } from "@/lib/types/error-form-";
import { ChangePasswordSchema } from "@/lib/schemes/change-password.schema";
import { useGlobalMutations } from "@/hooks/global-mutation.hooks";
import { ChangePaswword } from "@/lib/types/account-settings";
export default function ChangePasswordForm() {
  /* ---------------------------------- state --------------------------------- */
  const [oldPassword, setOldPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rePassword, setRePassword] = useState<boolean>(false);
  const [error, setError] = useState<TypeErrorForm>({ status: false, message: "" });

  /* --------------------------- form default value --------------------------- */
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
  });

  /* -------------------------------- save data ------------------------------- */
  const ChangePassword = useGlobalMutations<z.infer<typeof ChangePasswordSchema>, ChangePaswword>({
    url: "/api/change-password",
    setError,
    toastSuccess: true,
    methods: "PATCH",
    nativeUrl: true,
  });
  /* --------------------------------- submit --------------------------------- */
  async function onSubmit(data: z.infer<typeof ChangePasswordSchema>) {
    const res = await ChangePassword.mutateAsync(data);
    signIn("update", { ...res, redirect: false });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full w-full flex-col justify-start lg:w-full">
        <div className="flex flex-col gap-6">
          {/*  ------------------------------ header  ------------------------------  */}

          <div className="flex flex-col gap-4">
            {/*  ------------------------------ oldPassword ------------------------------  */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="grid w-full gap-3">
                  <FormLabel>Current Password</FormLabel>

                  <FormControl>
                    <div className="relative border border-x-0 border-t-0 pb-6">
                      <Input type={oldPassword ? "text" : "password"} placeholder="********" {...field} />
                      <Button
                        className="absolute -top-2.5 right-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setOldPassword(!oldPassword)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        {oldPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-forground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-forground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/*  ------------------------------ password ------------------------------  */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid w-full gap-3">
                  <FormLabel>New Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="********" {...field} />
                      <Button
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-forground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-forground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  ------------------------------ conform password ------------------------------  */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="grid w-full gap-3">
                  <FormLabel>Confirm New Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input type={rePassword ? "text" : "password"} placeholder="********" {...field} />
                      <Button
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setRePassword(!rePassword)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        {rePassword ? (
                          <EyeOff className="h-4 w-4 text-muted-forground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-forground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-9 pt-4">
              {/*  ------------------------------- error form response -------------------------------  */}
              {error.status && <ErrorForm setError={setError} messages={error.message} />}

              {/*  --------------------------------- submit ---------------------------------  */}
              <Button disabled={ChangePassword.isPending} type="submit" className="mt-3 w-full">
                Update Password
                <Loader2Icon className={`${ChangePassword.isPending ? "animate-spin" : "hidden"}`} />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
