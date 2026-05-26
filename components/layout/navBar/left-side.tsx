"use client";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import Image from "next/image";

export const LeftSide = () => {
  const { handleNavigation } = useHandleNavigation();
  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={() => handleNavigation("/")}
    >
      <Image loading="eager" src="/logo.svg" alt="Logo" width={50} height={50} />
      <div className="text-xl font-bold">Hotel</div>
    </div>
  );
};
