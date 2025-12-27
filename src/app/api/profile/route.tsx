import { ProfilrResponse } from "@/lib/types/account-settings";
import { BadRequestException } from "@/lib/utils/BadRequestException";
import GetTokenInHundeler from "@/lib/utils/get_token_in_hundeler";
/* -------------------------------- Get Account Data -------------------------------- */
export async function GET(request: Request) {
  try {
    const token = await GetTokenInHundeler(request);
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/profileData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${token?.accsesToken}`,
      },
    });
    const payload: ApiResponse<ProfilrResponse> = await res.json();
    if ("code" in payload) {
      throw new Error(payload.message);
    }
    return new Response(JSON.stringify(payload), { status: 200 });
  } catch (error) {
    return BadRequestException(error || "someting wnd wrong ", 400);
  }
}
/* ------------------------------- Update Account Data ------------------------------ */
export async function PUT(request: Request) {
  try {
    const token = await GetTokenInHundeler(request);
    const body = await request.json();
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/editProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `${token?.accsesToken}`,
      },
      body: JSON.stringify(body),
    });
    const payload: ApiResponse<ProfilrResponse> = await res.json();
    if ("code" in payload) {
      throw new Error(payload.message);
    }
  
    return new Response(JSON.stringify(payload), { status: 200 });
  } catch (error) {
    return BadRequestException(error || "someting wnd wrong ", 400);
  }
}
/* ----------------------------- Delete Account ----------------------------- */
export async function DELETE(request: Request) {
  try {
    const token = await GetTokenInHundeler(request);
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/deleteMe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `${token?.accsesToken}`,
      },
    });
    const payload: ApiResponse<ProfilrResponse> = await res.json();
    if ("code" in payload) {
      throw new Error(payload.message);
    }
    return new Response(JSON.stringify(payload), { status: 200 });
  } catch (error) {
    return BadRequestException(error || "someting wnd wrong ", 400);
  }
}
