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
    login: (
      state,
      action: PayloadAction<{ token: string; userId?: string }>
    ) => {
      const { token, userId } = action.payload;

      state.token = token;
      state.isLoggedIn = true;

      localStorage.setItem("authToken", token);

      if (userId) {
        state.userId = userId;
        localStorage.setItem("userId", userId);
      }
    },

    logOut: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;

      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
