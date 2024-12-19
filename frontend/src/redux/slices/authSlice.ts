import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("authToken"), // Leemos el token del localStorage
  userId: localStorage.getItem("userId"),
  isLoggedIn: !!localStorage.getItem("authToken"), // Si hay un token, está logueado
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

      state.token = token; // Guardamos el token en el estado
      state.isLoggedIn = true;

      // Guardamos el token en el localStorage con la clave 'authToken'
      localStorage.setItem("authToken", token);

      if (userId) {
        state.userId = userId;
        localStorage.setItem("userId", userId); // Guardamos el userId en localStorage
      }
    },

    logOut: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;

      // Eliminar token y userId del localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
