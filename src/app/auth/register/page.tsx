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
import { RegisterSchema } from "@/lib/schemes/register.schema";
import { PhoneInput } from "@/components/shared/phone-input";
import { signIn } from "next-auth/react";
import ErrorForm from "@/components/shared/error-form";
import type { TypeErrorForm } from "@/lib/types/error-form-";
export default function Page() {
  /* ---------------------------------- state --------------------------------- */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rePassword, setRePassword] = useState<boolean>(false);
  const [loading, setLoding] = useState<boolean>(false);
  const [error, setError] = useState<TypeErrorForm>({ status: false, message: "" });

  /* --------------------------- form default value --------------------------- */
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  });

  /* --------------------------------- submit --------------------------------- */
  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    setLoding(true);

    const res = await signIn("signup", { ...data, redirect: false });

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
        className="flex h-full w-[90%] max-w-[28.2rem] flex-col justify-center p-2 lg:w-full lg:p-0 lg:py-[9.09rem]"
      >
        <div className="flex flex-col gap-6">
          {/*  ------------------------------ header  ------------------------------  */}
          <h1 className="mx-auto h-16 font-inter text-3xl font-bold lg:mx-0">Create Account</h1>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2.5">
              {/*  ------------------------------ firstName ------------------------------  */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ahmed" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  ------------------------------ lastName ------------------------------  */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Abdullah" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/*  ------------------------------ username ------------------------------  */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="user123" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  ------------------------------ email ------------------------------  */}
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

            {/*  ------------------------------ phonenumber ------------------------------  */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="grid w-full gap-3">
                  <FormLabel>Phone</FormLabel>

                  <FormControl>
                    <PhoneInput
                      className=""
                      international
                      defaultCountry={"EG"}
                      onChange={(e) => {
                        field.onChange(e.replace("+2", ""));
                      }}
                    />
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

            {/*  ------------------------------ conform password ------------------------------  */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="grid w-full gap-3">
                  <FormLabel>rePassword</FormLabel>

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
          <div className="flex flex-col gap-9 pt-6">
            {/*  ------------------------------- error form response -------------------------------  */}
            {error.status && <ErrorForm setError={setError} messages={error.message} />}

            {/*  --------------------------------- submit ---------------------------------  */}
            <Button disabled={loading} type="submit" className="mt-3 w-full">
              Create Account
              <Loader2Icon className={`${loading ? "animate-spin" : "hidden"}`} />
            </Button>
            {/*  ----------------------------- Login to account -----------------------------  */}
            <p className="mx-auto flex flex-col text-center text-sm font-medium text-muted-forground lg:flex-row">
              Already have an account?
              <Link className="px-2 text-primary" href={"/auth/login"}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
}
