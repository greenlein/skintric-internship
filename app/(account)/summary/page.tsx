"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  manualAgeUpdate,
  manualGenderUpdate,
  manualRaceUpdate,
  resetDemographic,
  type DemographicData,
} from "@/app/redux/demographics";
import { ArrowLink } from "@/app/components/ArrowLink";

type CategoryKey = "race" | "age" | "gender";
type DemographicEntry = [string, number];

const categories: CategoryKey[] = ["race", "age", "gender"];

const categoryLabels: Record<CategoryKey, string> = {
  race: "Race",
  age: "Age",
  gender: "Gender",
};

const formatPercent = (value: number) => `${Math.round(Number(value) * 100)}%`;

const toTitleCase = (value: string) =>
  value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getTopEntry = (category: DemographicData[CategoryKey]) => {
  const entries = Object.entries(category) as DemographicEntry[];
  return entries[0] ?? ["", 0];
};

const getSortedTopEntry = (category: DemographicData[CategoryKey]) => {
  const entries = Object.entries(category).sort(
    ([, valueA], [, valueB]) => Number(valueB) - Number(valueA),
  ) as DemographicEntry[];
  return entries[0] ?? ["", 0];
};

const SELECTION_STORAGE_KEY = "skinstric-selected-demographics";

const getDefaultSelections = (demographics: DemographicData) => ({
  race: getTopEntry(demographics.race)[0],
  age: getTopEntry(demographics.age)[0],
  gender: getTopEntry(demographics.gender)[0],
});

const getSavedSelections = (demographics: DemographicData): Record<CategoryKey, string> => {
  if (typeof window === "undefined") {
    return getDefaultSelections(demographics);
  }

  try {
    const raw = window.localStorage.getItem(SELECTION_STORAGE_KEY);
    if (!raw) {
      return getDefaultSelections(demographics);
    }

    const parsed = JSON.parse(raw) as Partial<Record<CategoryKey, string>>;

    return {
      race: parsed.race ?? getDefaultSelections(demographics).race,
      age: parsed.age ?? getDefaultSelections(demographics).age,
      gender: parsed.gender ?? getDefaultSelections(demographics).gender,
    };
  } catch {
    return getDefaultSelections(demographics);
  }
};

export default function Summary() {
  const dispatch = useDispatch();
  const demographics = useSelector((state: { demographics: DemographicData }) => state.demographics);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("race");
  const [selectedDemographicKeys, setSelectedDemographicKeys] = useState<Record<CategoryKey, string>>(() =>
    getSavedSelections(demographics),
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(selectedDemographicKeys));
    }
  }, [selectedDemographicKeys]);

  const selectedList = useMemo(
    () => Object.entries(demographics[selectedCategory]) as DemographicEntry[],
    [demographics, selectedCategory],
  );

  const selectedKey = selectedDemographicKeys[selectedCategory] ?? selectedList[0]?.[0] ?? "";
  const selectedTopEntry = selectedList.find(([label]) => label === selectedKey) ?? selectedList[0] ?? ["", 0];
  const selectedTopValue = Number(selectedTopEntry[1]);

  const categoryButtons = categories.map((category) => {
    const [topLabel] = getTopEntry(demographics[category]);
    const isSelected = selectedCategory === category;

    return {
      key: category,
      label: selectedDemographicKeys[category] ?? topLabel,
      title: categoryLabels[category],
      isSelected,
    };
  });

  const selectDemographic = (key: string) => {
    setSelectedDemographicKeys((previous) => ({
      ...previous,
      [selectedCategory]: key,
    }));
  };

  const handleConfirm = () => {
    const confirmed = window.confirm("Do you want to confirm the current selections?");

    if (!confirmed) {
      return;
    }

    const key = selectedDemographicKeys[selectedCategory];

    if (!key) {
      return;
    }

    if (selectedCategory === "race") {
      dispatch(manualRaceUpdate({ race: key as keyof DemographicData["race"] }));
      return;
    }

    if (selectedCategory === "age") {
      dispatch(manualAgeUpdate({ age: key as keyof DemographicData["age"] }));
      return;
    }

    dispatch(manualGenderUpdate({ gender: key as keyof DemographicData["gender"] }));
  };

  const hasPendingChanges =
    selectedDemographicKeys.race !== getSortedTopEntry(demographics.race)[0] ||
    selectedDemographicKeys.age !== getSortedTopEntry(demographics.age)[0] ||
    selectedDemographicKeys.gender !== getSortedTopEntry(demographics.gender)[0];

  const handleReset = () => {
    if (!hasPendingChanges) {
      return;
    }

    const confirmed = window.confirm("Are you sure you want to reset the selections?");

    if (!confirmed) {
      return;
    }

    dispatch(resetDemographic());

    const nextSelections = {
      race: getSortedTopEntry(demographics.race)[0],
      age: getSortedTopEntry(demographics.age)[0],
      gender: getSortedTopEntry(demographics.gender)[0],
    };

    setSelectedDemographicKeys(nextSelections);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(nextSelections));
    }
  };

  return (
    <>
      <header className="absolute left-4 top-10 z-10 uppercase leading-[1.45]">
        <h1 className="text-[82px] font-black leading-[0.9] tracking-[-0.08em] text-[#171717]">DEMOGRAPHICS</h1>
        <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.16em] text-[#1c1c1c]">
          PREDICTED RACE &amp; AGE
        </p>
      </header>

      <main className="min-h-screen bg-white px-[30px] pb-8 pt-[195px] text-[#202020]">
        <div className="grid min-h-[545px] grid-cols-[208px_minmax(420px,1fr)_448px] gap-[14px]">
          <aside className="flex flex-col gap-2">
            {categoryButtons.map(({ key, label, title, isSelected }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                className={`flex h-[104px] flex-col justify-between border-t border-[#666] px-4 py-4 text-left transition-colors duration-150 ${
                  isSelected ? "bg-[#1d1e1e] text-white" : "bg-[#efefef] text-[#202020] hover:bg-[#d9d9d9]"
                }`}
              >
                <span className="text-[14px] font-semibold uppercase">{label}</span>
                <span className="text-[14px] font-semibold uppercase">{title}</span>
              </button>
            ))}
          </aside>

          <section className="relative border-t bg-[#f7f7f7]">
            <h2 className="px-4 pt-5 text-[38px] font-light tracking-[-2px]">{toTitleCase(selectedTopEntry[0])}</h2>

            <div className="absolute bottom-[25px] right-[16px] flex h-[384px] w-[384px] items-center justify-center">
              <svg
                className="h-[384px] w-[384px] -rotate-90"
                viewBox="0 0 384 384"
                aria-label="Demographic confidence ring"
              >
                <circle cx="192" cy="192" r="170" fill="none" stroke="#292929" strokeOpacity="0.12" strokeWidth="3" />
                <circle
                  cx="192"
                  cy="192"
                  r="170"
                  fill="none"
                  stroke="#292929"
                  strokeWidth="3"
                  strokeDasharray={2 * Math.PI * 170}
                  strokeDashoffset={2 * Math.PI * 170 * (1 - Math.min(Math.max(selectedTopValue, 0), 1))}
                  style={{ transition: "stroke-dashoffset 500ms ease" }}
                />
              </svg>

              <span className="absolute text-[39px] font-light tracking-[-2px]">
                {formatPercent(selectedTopValue).replace("%", "")}
                <sup className="relative -top-5 ml-1 text-[22px]">%</sup>
              </span>
            </div>
          </section>

          <section className="bg-[#f4f4f4]">
            <div className="flex h-[48px] items-center justify-between border-t border-[#777] px-4 text-[14px] uppercase">
              <span>{categoryLabels[selectedCategory]}</span>
              <span>A.I. confidence</span>
            </div>

            <ul className="text-[16px]">
              {selectedList.map(([label, value]) => {
                const isSelected = label === selectedKey;

                return (
                  <li
                    key={label}
                    className={`flex h-[48px] cursor-pointer items-center justify-between px-4 transition-colors duration-150 ${
                      isSelected ? "bg-[#1d1e1e] text-white" : "text-[#202020] hover:bg-[#d9d9d9] hover:text-[#202020]"
                    }`}
                    onClick={() => selectDemographic(label)}
                  >
                    <span>
                      <span className="mr-3 text-[17px]">◇</span>
                      {toTitleCase(label)}
                    </span>
                    <span>{formatPercent(value)}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="mt-6 flex items-center justify-between px-2">
          <ArrowLink label="BACK" direction="left" destination="select" />

          <p className="text-[12px] tracking-[0.02em] text-[#7b7b7b]">
            If A.I. estimate is wrong, please select the correct one.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasPendingChanges}
              className={`border px-5 py-2 text-[12px] font-medium uppercase tracking-[0.18em]  transition-colors duration-150 ${
                hasPendingChanges
                  ? "border-[#1d1d1d] bg-white text-[#1d1d1d] hover:bg-[#f3f3f3]"
                  : "cursor-not-allowed border-[#c4c4c4] bg-[#e8e8e8] text-[#9a9a9a]"
              }`}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="border border-[#1d1d1d] bg-[#1d1d1d] px-5 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#000000]"
            >
              Confirm
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
