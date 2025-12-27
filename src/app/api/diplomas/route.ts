import { DiplomasResponse } from "@/lib/types/diplomas";
import { BadRequestException } from "@/lib/utils/BadRequestException";
import GetTokenInHundeler from "@/lib/utils/get_token_in_hundeler";

export async function GET(request: Request) {
  try {
    const token = await GetTokenInHundeler(request);
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    console.log({ page });
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/subjects?page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${token?.accsesToken}`,
      },
    });
    const payload: ApiResponse<DiplomasResponse> = await res.json();
    if ("code" in payload) {
      throw new Error(payload.message);
    }
    return new Response(JSON.stringify(payload), { status: 200 });
  } catch (error) {
    return BadRequestException(error || "someting wnd wrong ", 400);
  }
}
