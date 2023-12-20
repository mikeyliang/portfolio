"use client"
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import LoadingAnimation from "../../components/LoadingAnimation"

export default function SignIn() {
  useEffect(() => {
    signIn("google", {redirect: false, callbackUrl: "/"}); 
  }, []);

  return <LoadingAnimation ></LoadingAnimation>;
};
