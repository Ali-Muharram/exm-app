import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Loader2Icon, MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { ForgotPasswordContext } from "@/app/auth/_hooks/forgot-password.context";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { forgotPasswordOtpSchema } from "@/lib/schemes/forgot-password-otp.schema";
import { useTimeResendOtp } from "@/app/auth/_hooks/time-reset-otp";
import { useGlobalMutations } from "@/hooks/global-mutation.hooks";
import { forgotPasswordSchema } from "@/lib/schemes/forgot-password.schema";
import { ForgotPasswordRespone, VerifyResetCodeRespone } from "@/lib/types/auth";
import ErrorForm from "@/components/shared/error-form";
import { TypeErrorForm } from "@/lib/types/error-form-";

export default function VerifyOtpForm() {
  const { email, setStepsNumber } = useContext(ForgotPasswordContext);
  const { seconds, setTime, getStatus } = useTimeResendOtp();
  const [error, setError] = useState<TypeErrorForm>({ status: false, message: "" });

  const form = useForm<z.infer<typeof forgotPasswordOtpSchema>>({
    resolver: zodResolver(forgotPasswordOtpSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  /* --------------------------------- submit --------------------------------- */
  const verifyResetCode = useGlobalMutations<z.infer<typeof forgotPasswordOtpSchema>, VerifyResetCodeRespone>({
    url: "/api/v1/auth/verifyResetCode",
    setError,
  });

  async function onSubmit(data: z.infer<typeof forgotPasswordOtpSchema>) {
    await verifyResetCode.mutateAsync(data);
    setStepsNumber(3);
  }

  /* --------------------------- resend otp  --------------------------- */
  const resendOtp = useGlobalMutations<z.infer<typeof forgotPasswordSchema>, ForgotPasswordRespone>({
    url: "/api/v1/auth/forgotPassword",
    toastSuccess: true,
    toastError: true,
  });

  async function ResendOtp() {
    const isAllowed = getStatus();
    if (!isAllowed) return;
    await resendOtp.mutateAsync({ email: email || "" });
    setTime();
    getStatus();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-[90%] flex-col justify-center lg:w-full lg:py-[19.33rem]"
      >
        <div className="flex flex-col gap-4">
          {/*  ---------------------------------- undo ----------------------------------  */}
          <div
            onClick={() => {
              setStepsNumber(1);
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center border"
          >
            <MoveLeft />
          </div>
          <div className="mt-6">
            {/*  --------------------------------- header ---------------------------------  */}
            <h1 className="font-inter text-3xl font-bold">Verify OTP</h1>

            {/* ---------------------------------- desc ---------------------------------- */}
            <p className="mt-2.5 text-base font-normal text-muted-forground">
              Please enter the 6-digits code we have sent to:
            </p>

            <p className="flex gap-2.5 pb-6 text-base font-normal text-foreground">
              {email}
              <p onClick={() => setStepsNumber(1)} className="cursor-pointer text-primary hover:text-primary-hover">
                Edit
              </p>
            </p>
          </div>

          {/* ---------------------------------- otp number ---------------------------------  */}
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormControl>
                  <InputOTP onChange={(e) => field.onChange(e)} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                    <InputOTPGroup className="mx-auto">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/*  ---------------------------------- timer ---------------------------------  */}
          {seconds > 0 && (
            <p className="mx-auto mt-2 flex gap-2 text-sm font-medium text-muted-forground">
              You can request another code in: {seconds}
            </p>
          )}

          {/*  ------------------------------- resend code otp ------------------------------  */}
          {seconds === 0 && (
            <p className="mx-auto mt-2 flex gap-2 text-sm font-medium text-muted-forground">
              Didn’t receive the code?
              <p onClick={ResendOtp} className="cursor-pointer text-primary hover:text-primary-hover">
                {!resendOtp.isPending && "Resend"}
                <Loader2Icon className={`${resendOtp.isPending ? "animate-spin" : "hidden"}`} />
              </p>
            </p>
          )}

          <div className="mt-6 flex flex-col gap-4">
            {/*  ------------------------------- error form response -------------------------------  */}
            {error.status && <ErrorForm setError={setError} messages={error.message} />}

            {/*  --------------------------------- submit ---------------------------------  */}
            <Button disabled={verifyResetCode.isPending} type="submit" className="w-full">
              Verify Code
              <MoveRight className="h-4 w-4" />
              <Loader2Icon className={`${verifyResetCode.isPending ? "animate-spin" : "hidden"}`} />
            </Button>

            {/* ----------------------------- create account -----------------------------  */}
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
