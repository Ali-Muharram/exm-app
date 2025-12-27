import { ExamResultResponse } from "@/lib/types/exam-result-response";
import GetTokenInHundeler from "@/lib/utils/get_token_in_hundeler";

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();

  const token = await GetTokenInHundeler(request);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/questions/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${token?.accsesToken}`,
    },
    body: JSON.stringify(body),
  });
  const payload: ApiResponse<ExamResultResponse> = await res.json();
  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return new Response(JSON.stringify(payload), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
