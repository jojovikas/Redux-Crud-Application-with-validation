import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

// checking git code push or not
// it is 2nd time tocheck data push or not
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
