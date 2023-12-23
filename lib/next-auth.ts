import NextAuth from "next-auth";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Providers from "next-auth/providers";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const NextOptions: NextAuthOptions = {
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

      if (user && account?.provider === "google") {
    
        return true;
      }
      return false;
    },

    async session({ session, user, token }) {
        session.user.role = user.role;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's role */
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
  
  interface User {
    role: "USER" | "ADMIN";
  } 
}


