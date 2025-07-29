import { login } from "@/api/login";
import { useAuthStore } from "@/store/auth";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export function useLogin() {
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data: { token: string }) => {
      setToken(data.token);
      navigate({ to: "/users" });
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
}
