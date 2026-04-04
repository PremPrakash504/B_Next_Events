import { configureStore } from "@reduxjs/toolkit";
import { indexSlice } from "./indexSlice";
import userSlice from "./authState";

const store = configureStore({
  reducer: {
    user: userSlice,
    [indexSlice.reducerPath]: indexSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(indexSlice.middleware),
});

export default store;