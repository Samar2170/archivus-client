// src/store/auth.ts
import { create } from "zustand";
import { signin } from "../api/auth";

interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  signinUser: (username: string, password: string, pin: string) => Promise<void>;
  signoutUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !=="undefined" ? sessionStorage.getItem("user") : null,
  token: typeof window !=="undefined" ? sessionStorage.getItem("token") : null,
  isAuthenticated: typeof window !=="undefined" ? !!sessionStorage.getItem("token") : false,

  signinUser: async (username: string, password: string,pin:string) => {
    const res = await signin(username, password, pin);
    sessionStorage.setItem("token", res.token);
    sessionStorage.setItem("user", username);
    set({ user: username, token: res.token, isAuthenticated: true });
  },

  signoutUser: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
