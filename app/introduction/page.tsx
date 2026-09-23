"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowLink } from "../components/ArrowLink";
import { useRouter } from "next/navigation";
import axios from "axios";

const PROMPTS = ["Introduce yourself", "Where are you from?"];

export default function IntroductionPage() {
  const router = useRouter();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submittedInput = input.trim();
    if (!submittedInput || /\d/.test(submittedInput)) {
      setError("Please enter a valid response.");
      return;
    }

    setError("");
    localStorage.setItem(currentPromptIndex === 0 ? "name" : "location", submittedInput);
    setInput("");

    if (currentPromptIndex === PROMPTS.length - 1) {
      router.push("/results");
      return;
    }

    setCurrentPromptIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="absolute inset-0 flex flex-col items-center justify-center">
        <label htmlFor="name" className="mb-3 text-[12px] text-[#a6a6a6]">
          CLICK TO TYPE
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setError("");
          }}
          aria-describedby={error ? "input-error" : undefined}
          aria-invalid={Boolean(error)}
          placeholder={PROMPTS[currentPromptIndex]}
          className="w-[356px] border-0 border-b border-[#555] bg-transparent px-0 pb-1 text-center text-[39px] font-light tracking-[-0.07em] outline-none placeholder:text-[#202124] focus:border-[#202124]"
        />
        {error && (
          <p id="input-error" role="alert" className="mt-2 text-[12px] text-red-600">
            {error}
          </p>
        )}
      </form>
    </>
  );
}
