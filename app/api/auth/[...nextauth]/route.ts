import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  prisma from "../../../../lib/prisma";
import type { NextAuthOptions } from "next-auth";

const NextOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    error: "/", //TODO: add in error page?
  },

  callbacks: {
    async signIn({ account, user}) {
      if (account?.provider === "oauth" && user) {
        return true;
      }
      return false;
    },
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(NextOptions);

export { handler as GET, handler as POST };
