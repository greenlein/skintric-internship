import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DemographicData {
  race: {
    black: number;
    white: number;
    "southeast asian": number;
    "south asian": number;
    "latino hispanic": number;
    "east asian": number;
    "middle eastern": number;
  };
  age: {
    "20-29": number;
    "30-39": number;
    "40-49": number;
    "10-19": number;
    "50-59": number;
    "3-9": number;
    "60-69": number;
    "70+": number;
    "0-2": number;
  };
  gender: {
    male: number;
    female: number;
  };
}

const initialState: DemographicData = {
  race: {
    black: 0,
    white: 0,
    "southeast asian": 0,
    "south asian": 0,
    "latino hispanic": 0,
    "east asian": 0,
    "middle eastern": 0,
  },
  age: {
    "20-29": 0,
    "30-39": 0,
    "40-49": 0,
    "10-19": 0,
    "50-59": 0,
    "3-9": 0,
    "60-69": 0,
    "70+": 0,
    "0-2": 0,
  },
  gender: {
    male: 0,
    female: 0,
  },
};

export const demographicSlice = createSlice({
  name: "demographics",
  initialState,
  reducers: {
    setDemographic: (state, action: PayloadAction<DemographicData>) => {
      const { data }: any = action.payload;
      state.race = data.race;
      state.age = data.age;
      state.gender = data.gender;
    },
  },
});

export const { setDemographic } = demographicSlice.actions;

export default demographicSlice.reducer;
