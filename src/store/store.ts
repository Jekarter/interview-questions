import { configureStore } from "@reduxjs/toolkit";
import repeatQuestionsReducer from "./reducers/questionsSlice";

export const store = configureStore({
  reducer: {
    questions: repeatQuestionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
