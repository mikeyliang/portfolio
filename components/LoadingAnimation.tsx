import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../public/loadingAnimation.json";

export default function LoadingAnimation() {
  return (
    <>
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="lg:p-24 lg:w-screen lg:h-screen xl:p-36"
      />
    </>
  );
}
