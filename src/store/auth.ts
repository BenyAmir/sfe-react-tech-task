import type { LoginResponse } from "@/types/auth";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (data: LoginResponse) => void;
  logout: () => void;
  setUserName: (name: string) => void;
  name: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  setToken: (data: LoginResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.user.username);
    set({ token: data.token, name: data.user.username });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    set({ token: null, name: "" })
  },
  setUserName: (name) => set({ name }),
  name: localStorage.getItem("userName") || "",
}));

export interface AuthenticationState {
  isAuthenticated: boolean;
}

export const useToken = () => useAuthStore((state) => state.token);
