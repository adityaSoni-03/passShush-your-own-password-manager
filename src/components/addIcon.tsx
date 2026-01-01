"use client";
import { useRef } from "react";
import Lottie from "lottie-react";
import copy from "../animations/add.json"
const copyAnimation = copy;

export default function AddIcon() {
  const lottieRef = useRef<any>(null);
  return (
    <div onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className="w-10 pl-2 h-10 cursor-pointer">
      <Lottie
        animationData={copyAnimation}
        loop={false}
        autoplay={false}
        lottieRef={lottieRef}

      />
    </div>
  );
}
