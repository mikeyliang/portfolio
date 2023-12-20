"use client";
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../public/loadingAnimation.json";

export default function LoadingAnimation() {
  return (
    <>
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="absolute top-0 left-0 w-full h-full bg-zinc-100 lg:p-12 lg:w-screen lg:h-screen xl:p-24"
      />
    </>
  );
}
