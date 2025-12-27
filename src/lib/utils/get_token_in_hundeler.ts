import { decode } from "next-auth/jwt";
const cookieName = process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token";
export default async function GetTokenInHundeler(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => {
        const [key, ...v] = c.split("=");
        return [key, v.join("=")];
      }),
    );

    const token = cookies[cookieName] || null;

    if (!token) return null;
    const jwt = await decode({
      token: token,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    if (!jwt) return null;

    return jwt;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
