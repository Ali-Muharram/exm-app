export function BadRequestException(error: unknown, code: number, status: number = 400) {
  let message = "حدث خطأ غير متوقع";

  if (error instanceof Error) message = error.message;
  if (typeof error === "string") message = error;
  console.error("BadRequestException:", message);
  return new Response(
    JSON.stringify({
      code,
      message,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  );
}
