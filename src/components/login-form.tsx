"use client";

import { loginHandler } from "@/api/login";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const [APIError, setAPIError] = React.useState<string | null>(null);
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {isPending, mutate:login} = useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ["login"],
    mutationFn: loginHandler,
    onSuccess: (data: { token: string }) => {
      setToken(data.token);
      router.invalidate(); // Force router to re-evaluate context
      navigate({ to: "/users" });
    },
    onError: (error) => {
      setAPIError(error.message || "Login failed. Please try again.");
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => login(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input id="username" required autoFocus {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" required {...field} />
                </FormItem>
              )}
            />
            {form.formState.errors.username && (
              <div className="text-destructive text-sm">
                {form.formState.errors.username.message}
              </div>
            )}
            {form.formState.errors.password && (
              <div className="text-destructive text-sm">
                {form.formState.errors.password.message}
              </div>
            )}
            
            {APIError && (
              <div className="text-destructive text-sm">{APIError}</div>
            )}
            
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
