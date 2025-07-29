import { login } from "@/api/login";
import { useAuthStore } from "@/store/auth";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function useLogin() {
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data: { token: string }) => {
      setToken(data.token);
      router.invalidate(); // Force router to re-evaluate context
      navigate({ to: "/users" });
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
}
