import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

// git code push 5.07 pm 11-09-2024

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
