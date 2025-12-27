import React from "react";
import ReactQueryProvider from "@/components/providers/app/_components/react-query.provider";
import NextAuthProvider from "@/components/providers/app/_components/next-auth-provider";

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>{children}</NextAuthProvider>
    </ReactQueryProvider>
  );
}
