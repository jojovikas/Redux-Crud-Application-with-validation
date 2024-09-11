import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

// new code push to git hub
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
