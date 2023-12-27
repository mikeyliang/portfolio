"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
const LoadingAnimation = dynamic(
  () => import("@/components/LoadingAnimation"),
  { ssr: false }
);

export default function SignOut() {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/" });
  }, []);

  return <LoadingAnimation/>;
}
