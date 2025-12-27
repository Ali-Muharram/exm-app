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
import { LoginSchema } from "@/lib/schemes/login.schema";
import { TypeErrorForm } from "@/lib/types/error-form-";
import { signIn } from "next-auth/react";
import ErrorForm from "@/components/shared/error-form";

export default function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoding] = useState<boolean>(false);
  const [error, setError] = useState<TypeErrorForm>({ status: false, message: "" });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    setLoding(true);

    const res = await signIn("login", { ...data, redirect: false });

    setLoding(false);

    if (!res?.ok) {
      setError({
        status: true,
        message: res?.error || "Something went wrong",
      });
      return;
    }

    location.replace("/dashboard");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-[90%] max-w-[28.2rem] flex-col justify-center p-2 lg:w-full lg:py-[19.33rem]"
      >
        <div className="flex flex-col gap-6">
          {/*  ------------------------------- header -------------------------------  */}
          <h1 className="mx-auto h-16 font-inter text-3xl font-bold lg:mx-0">Login</h1>

          <div className="flex flex-col gap-4">
            {/*  ------------------------------- email -------------------------------  */}
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

            {/*  ------------------------------- password -------------------------------  */}
            <div className="flex flex-col items-end">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid w-full gap-3">
                    <FormLabel>Password</FormLabel>
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

              {/* ------------------------------- forgot pass ------------------------------  */}
              <Link className="mt-2.5 text-sm font-medium text-primary" href="/auth/forgot-password">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-9 pt-6">
            {/*  ------------------------------- error form response -------------------------------  */}
            {error.status && <ErrorForm setError={setError} messages={error.message} />}

            {/*  --------------------------------- submit ---------------------------------  */}
            <Button disabled={loading} type="submit" className="w-full">
              Login
              <Loader2Icon className={`${loading ? "animate-spin" : "hidden"}`} />
            </Button>

            {/*  ----------------------------- create account -----------------------------  */}
            <p className="mx-auto flex flex-col text-center text-sm font-medium text-muted-forground lg:flex-row">
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
