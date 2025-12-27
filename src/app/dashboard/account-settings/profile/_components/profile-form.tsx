/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PhoneInput } from "@/components/shared/phone-input";
import ErrorForm from "@/components/shared/error-form";
import type { TypeErrorForm } from "@/lib/types/error-form-";
import { Loader2Icon } from "lucide-react";
import { GlobalQuery } from "@/lib/service/global-query.service";
import { ProfileSchema } from "@/lib/schemes/profile.scema";
import { ProfilrResponse } from "@/lib/types/account-settings";
import { useGlobalMutations } from "@/hooks/global-mutation.hooks";
import { useQueryClient } from "@tanstack/react-query";
import DeleteAccount from "./delete-account";
import { useSession } from "next-auth/react";
export default function ProfileForm() {
  const queryClient = useQueryClient();
  const { update } = useSession();
  /* ---------------------------------- state --------------------------------- */
  const [error, setError] = useState<TypeErrorForm>({ status: false, message: "" });

  /* --------------------------- form default value --------------------------- */
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
    },
  });

  /* -------------------------------- save data ------------------------------- */
  const SaveData = useGlobalMutations<z.infer<typeof ProfileSchema>, ProfilrResponse>({
    url: "/api/profile",
    setError,
    toastSuccess: true,
    methods: "PUT",
    nativeUrl: true,
  });
  /* --------------------------------- submit --------------------------------- */
  async function onSubmit(data: z.infer<typeof ProfileSchema>) {
    const res = await SaveData.mutateAsync(data);
    // refresh data profile in reach query cash
    queryClient.refetchQueries({
      queryKey: ["profile"],
    });
    const user = res.user;
    console.log({ user });
    update({
      user: {
        user,
      },
    });
  }

  /* ---------------------------- Get Profile Data ---------------------------- */
  const profileQuery = GlobalQuery<ProfilrResponse>({
    url: "/api/profile",
    key: "profile",
  });

  useEffect(() => {
    if (profileQuery.isSuccess) {
      const user = profileQuery.data.user;
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [profileQuery.isSuccess]);

  if (profileQuery.isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2Icon className={`animate-spin text-center`} />;
      </div>
    );
  }

  if (profileQuery.error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorForm setError={setError} messages={profileQuery.error.message} />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full w-full flex-col justify-start lg:w-full">
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
                    value={"+2" + field.value}
                    onChange={(e) => {
                      field.onChange(e.replace("+2", ""));
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-9 pt-4">
            {/*  ------------------------------- error form response -------------------------------  */}
            {error.status && <ErrorForm setError={setError} messages={error.message} />}

            <div className="flex gap-3.5">
              {/*  --------------------------------- delete acount ---------------------------------  */}
              <DeleteAccount />

              {/*  --------------------------------- submit ---------------------------------  */}
              <Button disabled={SaveData.isPending} type="submit" className="mt-3 w-full">
                Save Changes
                <Loader2Icon className={`${SaveData.isPending ? "animate-spin" : "hidden"}`} />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
