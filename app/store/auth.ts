// src/store/auth.ts
import { create } from "zustand";
import { signin } from "../api/auth";
import { persist } from "zustand/middleware";

interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  signinUser: (username: string, password: string, pin: string) => Promise<void>;
  signoutUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      signinUser: async (username: string, password: string, pin: string) => {
        const res = await signin(username, password, pin);
        set({ user: username, token: res.token, isAuthenticated: true });
      },
      
      signoutUser: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth",
    }
  )
);



// {
//   user: typeof window !=="undefined" ? localStorage.getItem("user") : null,
//   token: typeof window !=="undefined" ? localStorage.getItem("token") : null,
//   isAuthenticated: typeof window !=="undefined" ? !!localStorage.getItem("token") : false,

//   signinUser: async (username: string, password: string,pin:string) => {
//     const res = await signin(username, password, pin);
//     localStorage.setItem("token", res.token);
//     localStorage.setItem("user", username);
//     set({ user: username, token: res.token, isAuthenticated: true });
//   },

//   signoutUser: () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     set({ user: null, token: null, isAuthenticated: false });
//   },
// }