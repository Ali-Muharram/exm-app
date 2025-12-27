import { NextRequest } from "next/server";
import { ExamsResponse } from "@/lib/types/exams";
import { BadRequestException } from "@/lib/utils/BadRequestException";
import GetTokenInHundeler from "@/lib/utils/get_token_in_hundeler";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = searchParams.get("page");
    console.log({ page });

    const token = await GetTokenInHundeler(request);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/exams?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${token?.accsesToken}`,
      },
    });
    const payload: ApiResponse<ExamsResponse> = await res.json();
    if ("code" in payload) {
      throw new Error(payload.message);
    }
    return new Response(JSON.stringify(payload), { status: 200 });
  } catch (error) {
    return BadRequestException(error || "someting wnd wrong ", 400);
  }
}
