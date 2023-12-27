import {NextOptions} from "@/lib/next-auth";
import NextAuth from "next-auth";

const handler = NextAuth(NextOptions);

export { handler as GET, handler as POST };
