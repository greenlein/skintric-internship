import React from "react";
import { ArrowLink } from "../components/ArrowLink";

export default function layout({ children }: LayoutProps<"/">) {
  return (
    <main className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#fafafa] text-[#1f1f1f]">
      <p className="absolute left-6 top-8 text-[12px] font-semibold tracking-[-0.03em]">TO START ANALYSIS</p>

      <section className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 sm:h-[560px] sm:w-[560px]">
        <div className="absolute inset-[25px] animate-[spin_8s_linear_infinite_reverse] rotate-45 border border-dotted border-[#e2e5e6]" />
        <div className="absolute inset-[50px] animate-[spin_9s_linear_infinite] rotate-45 border border-dotted border-[#d8dddf]" />
        <div className="absolute inset-[78px] animate-[spin_25s_linear_infinite_reverse] rotate-45 border border-dotted border-[#bfc5c7]" />

        {children}
      </section>

      <div className="absolute bottom-7 left-7">
        <ArrowLink label="BACK" direction="left" destination="/" />
      </div>
    </main>
  );
}
