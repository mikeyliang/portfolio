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
        className="absolute top-0 left-0 bg-white lg:p-12 lg:w-screen lg:h-screen xl:p-24"
      />
    </>
  );
}
