import { authOptions } from "@/app/auth";
import { ChangePaswword } from "@/lib/types/account-settings";
import { BadRequestException } from "@/lib/utils/BadRequestException";
import GetTokenInHundeler from "@/lib/utils/get_token_in_hundeler";
import { getServerSession } from "next-auth";

export async function PATCH(request: Request) {
  try {
    const token = await GetTokenInHundeler(request);
    const session = await getServerSession(authOptions);

    const body = await request.json();
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/changePassword", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: `${token?.accsesToken}`,
      },
      body: JSON.stringify(body),
    });
    const payload: ApiResponse<ChangePaswword> = await res.json();
    if ("code" in payload) {
      throw new Error(payload.message);
    }

    return new Response(
      JSON.stringify({
        message: "success",
        user: JSON.stringify(session?.user),
        token: payload.token,
      }),
      { status: 200 },
    );
  } catch (error) {
    return BadRequestException(error || "someting wnd wrong ", 400);
  }
}
