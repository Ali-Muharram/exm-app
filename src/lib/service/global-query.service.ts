import { useQuery } from "@tanstack/react-query";
import { TypeErrorForm } from "@/lib/types/error-form-";
import { toast } from "sonner";

export function GlobalQuery<TResponse>({
  url,
  key,
  toastSuccess,
  toastError,
  gcTime,
  setError,
}: {
  url: string;
  key: string;
  toastSuccess?: boolean;
  toastError?: boolean;
  gcTime?: number;
  setError?: React.Dispatch<React.SetStateAction<TypeErrorForm>>;
}) {
  return useQuery({
    queryKey: [key],
    gcTime,
    queryFn: async () => {
      /* ---------------------------------- fetch --------------------------------- */
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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
