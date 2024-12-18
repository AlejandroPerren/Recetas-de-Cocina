import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
 
  token: localStorage.getItem("authToken") ? `Bearer ${localStorage.getItem("authToken")}` : null,
  userId: localStorage.getItem("userId"),
  isLoggedIn: !!localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      
      const token = action.payload.token;
      state.token = `Bearer ${token}`;
      localStorage.setItem("authToken", token); 
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
