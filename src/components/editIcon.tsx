"use client";
import { useRef } from "react";
import Lottie from "lottie-react";
import edit from "../animations/edit (2).json"
const editAnimation = edit;

export default function EditIcon() {
  const lottieRef = useRef<any>(null);
  return (
    <div onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className="w-10 h-10 cursor-pointer">
      <Lottie
        animationData={editAnimation}
        loop={false}
        autoplay={false}
        lottieRef={lottieRef}

      />
    </div>
  );
}