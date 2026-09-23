"use client";

import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import RotatingSquares from "@/app/components/RotatingSquares";
import { useRouter } from "next/navigation";
import LoadingDemographic from "./(Preparing)/page";

export default function ResultsPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState("");

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const image = event.target.files?.[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    setIsUploading(true);

    try {
      const response = await axios.post("/api/phase-two", formData);
      console.log(response.data);
      setStatus("Upload successful");

      // Simulate API fetching data for 2.5 seconds before navigating to the next page
      await delay(2500);
      router.push("/select");
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("Upload failed");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="h-full w-full">
      {!isUploading ? (
        <div className="flex h-full items-center justify-center gap-8 px-6 md:gap-24">
          <div className="relative aspect-[2/1] w-full max-w-[560px] flex-1">
            <button className="cursor-pointer hover:scale-105 active:scale-95 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background z-1 rounded-full h-[125px] w-[125px] overflow-hidden">
              <img src="/assets/aperture.png" alt="" className="h-[125px] w-[125px]" />
            </button>

            <p className="absolute right-0 top-0">
              ALLOW A.I. <br />
              TO SCAN YOUR FACE
            </p>

            <figure className="absolute right-[25%] top-0 scale-55 z-0">
              <img src="/assets/arrow.png" alt="" />
            </figure>

            <RotatingSquares size={400} />
          </div>

          <div className="relative aspect-[2/1] w-full max-w-[560px] flex-1">
            <button
              type="button"
              className="cursor-pointer hover:scale-105 active:scale-95 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background z-1 rounded-full h-[125px] w-[125px] overflow-hidden"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
            >
              <img src="/assets/landscape.png" alt="" className="h-[125px] w-[125px] overflow-hidden" />
            </button>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />

            <p className="absolute bottom-0 left-0 text-end">
              ALLOW A.I. <br />
              ACCESS TO GALLERY
            </p>

            <figure className="absolute bottom-0 left-[25%] scale-59 rotate-180">
              <img src="/assets/arrow.png" alt="" />
            </figure>
            <RotatingSquares size={400} />
          </div>
        </div>
      ) : (
        <LoadingDemographic />
      )}
    </div>
  );
}
