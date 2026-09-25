"use client";

import { useState } from "react";
import { ArrowLink } from "./components/ArrowLink";

const Home = () => {
  const [hoveredDirection, setHoveredDirection] = useState<"left" | "right" | null>(null);

  return (
    <main className=" h-[calc(100vh-80px)] overflow-hidden bg-background font-sans text-text">
      <section className="relative flex h-full w-full items-center justify-center">
        <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2">
          {!(hoveredDirection === "right") && (
            <ArrowLink
              direction="left"
              label="DISCOVER A.I."
              destination=""
              showBox
              onMouseEnter={() => setHoveredDirection("left")}
              onMouseLeave={() => setHoveredDirection(null)}
            />
          )}
        </div>

        <div className="absolute right-6 top-1/2 z-10 -translate-y-1/2">
          {!(hoveredDirection === "left") && (
            <ArrowLink
              direction="right"
              label="TAKE TEST"
              destination="introduction"
              showBox
              onMouseEnter={() => setHoveredDirection("right")}
              onMouseLeave={() => setHoveredDirection(null)}
            />
          )}
        </div>

        <h1
          className={`absolute top-1/2 -translate-y-1/2 text-[clamp(4rem,8.2vw,8.4rem)] font-light leading-[0.88] tracking-[-0.075em] transition-all duration-1000 ${
            hoveredDirection === "left"
              ? "right-6 text-end "
              : hoveredDirection === "right"
                ? "left-6 text-start"
                : "left-1/2 -translate-x-1/2 text-center"
          }`}
        >
          <span>Sophisticated</span>
          <br />
          <span>skincare</span>
        </h1>

        <p className="absolute bottom-8 left-6 max-w-67.5 text-[11px] uppercase leading-5 text-[#1A1B1C]">
          Skinstric developed an A.I. that creates a highly-personalised routine tailored to what your skin needs.
        </p>
      </section>
    </main>
  );
};

export default Home;
