import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import reducer from './reducer';  // Import the reducer that handles payments and loans

export const store = configureStore({
  reducer: {
    user: userReducer,
    data: reducer,

  },
});
