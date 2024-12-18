import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("authToken"),
  userId: localStorage.getItem("userId"),
  isLoggedIn: !!localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem("authToken", action.payload.token);
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
