import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  setUserName: (name: string) => void;
  name: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  setToken: (token) => set({ token }),
  logout: () => set({ token: null,name: "" }),
  setUserName: (name) => set({ name }),
  name: localStorage.getItem("userName") || "",
}));

export interface AuthenticationState {
  isAuthenticated: boolean;
};

export const useToken = () => useAuthStore((state) => state.token);

