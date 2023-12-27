"use client"
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
const LoadingAnimation = dynamic(
  () => import("@/components/LoadingAnimation"),
  { ssr: false }
);

export default function SignIn() {
  useEffect(() => {
    signIn("google", {redirect: false, callbackUrl: "/"}); 
  }, []);

  return <LoadingAnimation />;
};
