import { LoginRespone, RegsterRespone } from "@/lib/types/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  /* -------------------------------------------------------------------------- */
  /*                                    login                                   */
  /* -------------------------------------------------------------------------- */
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const res = await fetch(`${process.env.APP_URL}/api/v1/auth/signin`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        const payload: ApiResponse<LoginRespone> = await res.json();
        if ("code" in payload) throw new Error(payload.message);

        return {
          id: payload.user._id,
          accsesToken: payload.token,
          user: payload.user,
        };
      },
    }),

    /* -------------------------------------------------------------------------- */
    /*                                   update Credentials                       */
    /* -------------------------------------------------------------------------- */
    CredentialsProvider({
      id: "update",
      name: "update",

      credentials: {
        user: {},
        token: {},
      },
      async authorize(credentials) {
        if (!credentials || !credentials.user || !credentials.token) return null;
        const payload: LoginRespone = {
          user: JSON.parse(credentials.user),
          token: credentials.token,
        };
        return {
          id: payload?.user._id,
          accsesToken: payload?.token,
          user: payload?.user,
        };
      },
    }),
  ],
  /* -------------------------------------------------------------------------- */
  /*                                  callbacks                                 */
  /* -------------------------------------------------------------------------- */
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accsesToken = user.accsesToken;
        token.user = user.user;
      }
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
export default NextAuth(authOptions);
