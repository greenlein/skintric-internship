"use client";

import RotatingSquares from "@/app/components/RotatingSquares";
import { useRouter } from "next/navigation";

const SelectPage = () => {
  const router = useRouter();

  const tiles = [
    { label: "DEMOGRAPHICS", position: "col-start-1 row-start-1" },
    { label: "COSMETIC\nCONCERNS", position: "col-start-2 row-start-1" },
    { label: "SKIN TYPE\nDETAILS", position: "col-start-1 row-start-2" },
    { label: "WEATHER", position: "col-start-2 row-start-2" },
  ];

  return (
    <>
      <header className="absolute left-4 top-10 z-10 uppercase leading-[1.45]">
        <p>A.I. HAS ESTIMATED THE FOLLOWING.</p>
        <p>FIX ESTIMATED INFORMATION IF NEEDED.</p>
      </header>

      <RotatingSquares size={600} />
      <section
        aria-label="Estimated information categories"
        className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 sm:h-[490px] sm:w-[490px]"
      >
        <div className="absolute left-1/2 top-1/2 grid h-[244px] w-[244px] -translate-x-1/2 -translate-y-1/2 rotate-45 grid-cols-2 grid-rows-2 gap-[3px] bg-white sm:h-[280px] sm:w-[280px]">
          {tiles.map(({ label, position }) => (
            <div
              key={label}
              onClick={label === "DEMOGRAPHICS" ? () => router.push("/summary") : undefined}
              className={`${position} flex  ${
                label === "DEMOGRAPHICS" ? "cursor-pointer" : "cursor-not-allowed"
              } items-center justify-center bg-[#f2f2f2] text-center font-medium leading-[1.45] transition-colors hover:bg-[#e5e5e5]`}
            >
              <span className="block -rotate-45 whitespace-pre-line font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SelectPage;
