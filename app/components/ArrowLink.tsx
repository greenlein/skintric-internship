"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ArrowLinkProps = {
  label: string;
  direction: "left" | "right";
  destination?: string;
  showBox?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const ArrowLinkBox = ({
  direction,
  isPinging,
}: {
  direction: "left" | "right";
  isPinging: boolean;
}) => (
  <>
    <div
      className={`pointer-events-none absolute ${
        direction === "left" ? "left-[-325px]" : "right-[-325px]"
      } top-1/2 h-[602px] w-[602px] -translate-y-1/2 rotate-45 border border-dashed border-[#c1c5c6]`}
    />

    {isPinging && (
      <div
        className={`pointer-events-none absolute ${
          direction === "left" ? "left-[-325px]" : "right-[-325px]"
        } top-1/2 h-[602px] w-[602px] -translate-y-1/2 rotate-45 border border-dashed border-[#c1c5c6] animate-ping [animation-duration:2s]`}
      />
    )}
  </>
);

export const ArrowLink = ({
  label,
  direction,
  showBox = false,
  destination,
  onMouseEnter,
  onMouseLeave,
}: ArrowLinkProps) => {
  const [isPinging, setIsPinging] = useState(false);
  const router = useRouter();

  return (
    <>
      {showBox && <ArrowLinkBox direction={direction} isPinging={isPinging} />}
      <button
        type="button"
        aria-label={label}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => {
          setIsPinging(true);
          window.setTimeout(() => setIsPinging(false), 1500);
          router.push(`/${destination}`);
        }}
        className={`group flex items-center gap-4 text-[10px] font-medium text-text ${
          direction === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <span className="grid h-9 w-9 rotate-45 place-items-center border border-text transition-colors group-hover:bg-[#f1f1f1]">
          <span className="-rotate-45 text-xl leading-none">
            {direction === "left" ? "‹" : "›"}
          </span>
        </span>
        <span>{label}</span>
      </button>
    </>
  );
};
