import { configureStore } from "@reduxjs/toolkit";
import vuReducer from "./visitedUser";

export default configureStore({
  reducer: {
    vu: vuReducer,
  },
});
