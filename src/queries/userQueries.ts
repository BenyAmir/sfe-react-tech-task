import { createUserApi } from "@/api/createUser";
import { deleteUserApi } from "@/api/deleteUser";
import { editUserApi } from "@/api/editUsers";
import { getUsersApi } from "@/api/getUsers";
import { useToken } from "@/store/auth";
import type { User, UserModel, UserWithPassword } from "@/types/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";

export function useGetUsers() {
  const token = useToken();

  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => getUsersApi(token),
  });
}

export function useCreateUser() {
  const token = useToken();
  const navigate = useNavigate();

  return useMutation<UserWithPassword, Error, UserModel>({
    mutationFn: (data: UserModel) => createUserApi(data, token),
    onSuccess: () => {
      navigate({ to: "/users" });
    },
    onError(error: Error) {
      console.error("Error creating user:", error.message);
    },
  });
}

export function useEditUser({ id }: { id: number }) {
  const token = useToken();
  const navigate = useNavigate();

  return useMutation<UserWithPassword, Error, UserModel>({
    mutationFn: (data) => editUserApi(id, data, token),
    onSuccess: () => {
      navigate({ to: "/users" });
    },
    onError(error: Error) {
      console.error("Error creating user:", error.message);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const token = useToken();

  return useMutation({
    mutationFn: (id: number) => deleteUserApi(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUsersInTable({
  table,
  setRowSelection,
}: {
  table: Table<User>;
  setRowSelection: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  const queryClient = useQueryClient();
  const token = useToken();

  return useMutation({
    mutationFn: () => {
      const ids = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original.id);
      return deleteUserApi(ids, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setRowSelection({});
    },
    onError: () => {
      setRowSelection({});
    },
  });
}
