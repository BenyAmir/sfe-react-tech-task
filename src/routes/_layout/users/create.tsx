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
import { useCreateUser } from "@/queries/userQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_layout/users/create")({
  component: UserCreatePage,
});

const formSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .refine((val) => !val.toLowerCase().includes("test"), {
      message: "Username cannot contain 'test'",
    }),
  password: z.string().min(1, "Password is required"),
  isAdmin: z.boolean(),
});

function UserCreatePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      isAdmin: false,
    },
  });

  const { isPending, mutate: createUser, error, isError } = useCreateUser();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create User</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => createUser(data))}
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
            {isPending ? "Creating..." : "create User"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
