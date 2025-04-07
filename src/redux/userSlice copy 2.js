import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  reducers: {
    // setUser: (state, action) => {
    //     state.userInfo = {
    //       ...action.payload,  // Spread existing user info to ensure all properties are kept
    //       email: action.payload.email,  // Ensure email is explicitly included
    //     };
      
    //     localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    //   },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo"); // Ensure this clears only on logout
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
