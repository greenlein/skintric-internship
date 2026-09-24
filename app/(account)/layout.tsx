"use client";

import { Provider } from "react-redux";
import { ArrowLink } from "../components/ArrowLink";
import { store } from "../redux/store";

export default function layout({ children }: LayoutProps<"/">) {
  return (
    <Provider store={store}>
      <main className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#fafafa] text-[#1f1f1f]">
        <p className="absolute left-4 top-4 text-[12px] font-semibold tracking-[-0.03em]">
          A.I. ANALYSIS
        </p>

        {children}

        <div className="absolute flex bottom-7 left-7 justify-between w-[calc(100%-3.5rem)]">
          <ArrowLink label="BACK" direction="left" destination="/" />
          <ArrowLink label="GET SUMMARY" direction="right" destination="/" />
        </div>
      </main>
    </Provider>
  );
}
