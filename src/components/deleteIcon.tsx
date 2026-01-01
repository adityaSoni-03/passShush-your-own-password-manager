"use client";
import { useRef } from "react";
import Lottie from "lottie-react";
import copy from "../animations/delete (1).json"
const copyAnimation = copy;

export default function DeleteIcon() {
  const lottieRef = useRef<any>(null);
  return (
    <div onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className="w-9 h-9 cursor-pointer">
      <Lottie
        animationData={copyAnimation}
        loop={false}
        autoplay={false}
        lottieRef={lottieRef}

      />
    </div>
  );
}