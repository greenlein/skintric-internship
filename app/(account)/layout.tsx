"use client";

import { Provider } from "react-redux";
import { ArrowLink } from "../components/ArrowLink";
import { store } from "../redux/store";

export default function layout({ children }: LayoutProps<"/">) {
  return (
    <Provider store={store}>
      <main className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#fafafa] text-[#1f1f1f]">
        <p className="absolute left-4 top-4 text-[12px] font-semibold tracking-[-0.03em]">A.I. ANALYSIS</p>

        {children}
      </main>
    </Provider>
  );
}
