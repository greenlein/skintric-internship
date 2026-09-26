"use client";

import { ArrowLink } from "@/app/components/ArrowLink";
import Link from "next/link";

const Camera = () => (
  <main className="fixed inset-0 z-50 overflow-hidden bg-[#d0d1d1] text-[#f7f7f7]">
    <header className="absolute left-6 top-5 flex items-center gap-3">
      <span className="text-[9px] font-semibold tracking-[0.08em]">
        SKINSTRIC
      </span>
      <span aria-hidden="true" className="h-4 w-12 border-x border-white/45" />
    </header>

    <button
      type="button"
      aria-label="Take picture"
      className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-3 text-[9px] font-medium text-white/90"
    >
      <span>TAKE PICTURE</span>
      <span className="grid size-11 place-items-center rounded-full border border-white/80 bg-white/15">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="size-5 stroke-[#92999b]"
          strokeWidth="1.25"
        >
          <path d="M4 8.5h3l1.4-2h7.2l1.4 2h3v10H4z" />
          <circle cx="12" cy="13.5" r="3.25" />
          <path d="M18 10h.01" />
        </svg>
      </span>
    </button>

    {/* <Link
      href="/results"
      aria-label="Back to results"
      className="absolute bottom-7 left-7 grid size-8 rotate-45 place-items-center border border-white/75 transition-colors hover:bg-white/15"
    >
      <span aria-hidden="true" className="-rotate-45 text-[17px] leading-none">
        ‹
      </span>
    </Link> */}

    <div className="absolute bottom-7 left-7 grid size-8 place-items-center">
      <ArrowLink label="" direction="left" destination="/results" color="white"/>
    </div>

    <section className="absolute bottom-8 left-1/2 flex w-max max-w-[calc(100%-7rem)] -translate-x-1/2 flex-col items-center gap-4 text-center text-[9px] font-medium">
      <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
        <li className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-1.5 rotate-45 border border-white"
          />
          NEUTRAL EXPRESSION
        </li>
        <li className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-1.5 rotate-45 border border-white"
          />
          FRONTAL POSE
        </li>
        <li className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-1.5 rotate-45 border border-white"
          />
          ADEQUATE LIGHTING
        </li>
      </ul>
    </section>
  </main>
);

export default Camera;
