import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken'),
  isLoggedIn: !!localStorage.getItem('authToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('authToken', action.payload); 
    },
    logOut: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('authToken'); 
    },
  },
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
