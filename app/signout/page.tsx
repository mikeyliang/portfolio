"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import LoadingAnimation from "../../components/LoadingAnimation";

export default function SignOut() {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/" });
  }, []);

  return <LoadingAnimation></LoadingAnimation>;
}
