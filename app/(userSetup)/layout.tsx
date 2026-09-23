import React from "react";
import { ArrowLink } from "../components/ArrowLink";

export default function layout({ children }: LayoutProps<"/">) {
  return (
    <main className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#fafafa] text-[#1f1f1f]">
      <p className="absolute left-6 top-8 text-[12px] font-semibold tracking-[-0.03em]">TO START ANALYSIS</p>

      {children}

      <div className="absolute bottom-7 left-7">
        <ArrowLink label="BACK" direction="left" destination="/" />
      </div>
    </main>
  );
}
