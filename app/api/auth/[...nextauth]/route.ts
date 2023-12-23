import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  prisma from "../../../../lib/prisma";
import {NextOptions} from "@/lib/next-auth";

const handler = NextAuth(NextOptions);

export { handler as GET, handler as POST };
