import { TypeErrorForm } from "@/lib/types/error-form-";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGlobalMutations<TInput, TResponse>({
  url,
  nativeUrl,
  toastSuccess,
  toastError,
  setError,
  methods,
}: {
  url: string;
  toastSuccess?: boolean;
  toastError?: boolean;
  setError?: React.Dispatch<React.SetStateAction<TypeErrorForm>>;
  methods?: string;
  nativeUrl?: boolean;
}) {
  return useMutation({
    mutationFn: async (data: TInput) => {
      let fetchurl = process.env.NEXT_PUBLIC_API_URL + url;
      if (nativeUrl) fetchurl = url;
      /* ---------------------------------- fetch --------------------------------- */
      const res = await fetch(fetchurl, {
        method: methods || "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const payload: ApiResponse<TResponse> = await res.json();
      /* -------------------------------- if error -------------------------------- */
      if ("code" in payload) {
        if (toastError) toast.error(payload.message);

        if (setError) {
          setError({
            status: true,
            message: payload.message || "Something went wrong",
          });
        }

        throw new Error(payload.message);
      }
      /* ----------------------------------- end ---------------------------------- */
      if (toastSuccess) toast.success("action success");
      return payload;
    },
  });
}
