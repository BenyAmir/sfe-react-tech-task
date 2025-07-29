import { getUserApi } from "@/api/getUser";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEditUser } from "@/queries/userQueries";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

export const Route = createFileRoute("/_layout/users/$userId")({
  component: UserEditPage,
  loader: async ({ params }: { params: { userId: string } }) => {
    if (!params.userId) {
      throw new Error("User ID is required");
    }
    const token = useAuthStore.getState().token;
    return getUserApi(params.userId, token);
  },
});

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  isAdmin: z.boolean(),
});

function UserEditPage() {
  const user = Route.useLoaderData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username || "",
      password: "",
      isAdmin: user.role === "admin",
    },
  });

  const {
    isPending,
    mutate: editUser,
    error,
    isError,
  } = useEditUser({ id: user.id });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => editUser(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" autoFocus {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAdmin"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="isAdmin">isAdmin</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
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

          {isError && (
            <div className="text-destructive text-sm">{error.message}</div>
          )}

          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center">
                <LoaderCircle
                  size={16}
                  className="animate-spin cursor-pointer text-red-500 hover:text-red-700 text-sm"
                />
                <span>"Creating..."</span>
              </div>
            ) : (
              "Edit User"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
