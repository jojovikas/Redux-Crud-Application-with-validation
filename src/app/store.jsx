import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

// all comment are remove
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
