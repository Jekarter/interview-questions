import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { QuestionObject, QuestionsType } from "../../types/types";
//import type { RootState } from '../store'

interface QuestionsState {
  repeatQuestions: QuestionsType;
  isRepeat: boolean;
}

const initialState: QuestionsState = {
  repeatQuestions: [],
  isRepeat: false,
};

export const questionsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addRepeatQuestions: (state, action: PayloadAction<QuestionObject>) => {
      const existingIndex = state.repeatQuestions.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex == -1) {
        state.repeatQuestions.push(action.payload);
      }
    },
    deleteRepeatQuestions: (state, action: PayloadAction<QuestionObject>) => {
      const existingIndex = state.repeatQuestions.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex !== -1) {
        state.repeatQuestions.splice(existingIndex, 1);
      }
    },
    isRepeat: (state, action: PayloadAction<boolean>) => {
      state.isRepeat = action.payload;
    },
  },
});

export const { addRepeatQuestions, deleteRepeatQuestions, isRepeat } =
  questionsSlice.actions;

export default questionsSlice.reducer;
