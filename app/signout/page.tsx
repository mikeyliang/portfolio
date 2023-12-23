"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import LoadingAnimation from "../../components/LoadingAnimation";

export default function SignOut() {
  useEffect(() => {
    signOut({ redirect: false, callbackUrl: "/" });
  }, []);

  return <LoadingAnimation></LoadingAnimation>;
}
