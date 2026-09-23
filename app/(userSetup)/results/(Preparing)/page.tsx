import RotatingSquares from "@/app/components/RotatingSquares";
import React from "react";

export default function LoadingDemographic() {
  return (
    <div className="flex h-full items-center justify-center gap-8 px-6 md:gap-24">
      <p className="font-semibold text-4">PREPARING YOUR ANALYSIS ...</p>
      <RotatingSquares size={500} />
    </div>
  );
}
