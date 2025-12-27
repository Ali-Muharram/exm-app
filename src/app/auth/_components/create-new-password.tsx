"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { CreatePasswordSchema } from "@/lib/schemes/create-password.schema";
import { useGlobalMutations } from "@/hooks/global-mutation.hooks";
import { TypeErrorForm } from "@/lib/types/error-form-";
import ErrorForm from "@/components/shared/error-form";
import { useRouter } from "next/navigation";
import { ResetPasswordRespone } from "@/lib/types/auth";
import { ForgotPasswordContext } from "@/app/auth/_hooks/forgot-password.context";

export default function CreateNewPassword() {
  const router = useRouter();
  const { email, setEmail } = useContext(ForgotPasswordContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rePassword, setRePassword] = useState<boolean>(false);
  const [error, setError] = useState<TypeErrorForm>({ status: false, message: "" });

  const form = useForm<z.infer<typeof CreatePasswordSchema>>({
    resolver: zodResolver(CreatePasswordSchema),
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
  });
  /* --------------------------------- submit --------------------------------- */
  const ResetPassword = useGlobalMutations<Omit<z.infer<typeof CreatePasswordSchema>, "rePassword">, ResetPasswordRespone>({
    url: "/api/v1/auth/resetPassword",
    setError,
    toastSuccess: true,
    methods: "PUT",
  });

  async function onSubmit(data: z.infer<typeof CreatePasswordSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rePassword, ...rest } = data;
    const newData = {
      ...rest,
      email,
    };

    await ResetPassword.mutateAsync(newData);
    setEmail("");
    router.replace("/auth/login");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-[90%] flex-col justify-center lg:w-full lg:py-[19.33rem]"
      >
        <div className="flex flex-col gap-2.5">
          {/* ---------------------------------- title ----------------------------------  */}
          <h1 className="font-inter text-3xl font-bold">Create a New Password</h1>

          {/* ---------------------------------- desc ----------------------------------  */}
          <p className="pb-6 text-base font-normal text-muted-forground">Create a new strong password for your account.</p>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {/* ---------------------------------- newPassword ----------------------------------  */}
          <FormField
            control={form.control}
            name="newPassword"
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

          {/* ---------------------------------- rePassword ----------------------------------  */}
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
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {/*  ------------------------------- error form response -------------------------------  */}
          {error.status && <ErrorForm setError={setError} messages={error.message} />}

          {/*  --------------------------------- submit ---------------------------------  */}
          <Button disabled={ResetPassword.isPending} type="submit" className="w-full">
            Reset Password
            <Loader2Icon className={`${ResetPassword.isPending ? "animate-spin" : "hidden"}`} />
          </Button>

          {/* ----------------------------- create account -----------------------------  */}
          <p className="mx-auto flex flex-col text-center text-sm font-medium text-muted-forground lg:flex-row">
            Don’t have an account?
            <Link className="px-2 text-primary" href={"/auth/register"}>
              Create yours
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
