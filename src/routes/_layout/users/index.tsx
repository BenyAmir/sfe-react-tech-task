import { columns } from "@/components/user-table-columns";
import { UsersTable } from "@/components/users-table";
import { useGetUsers } from "@/queries/userQueries";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_layout/users/")({
  component: UsersListPage,
});

function UsersListPage() {
  const { data } = useGetUsers()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link
          to="/users-create"
          className="flex items-center px-3 py-2 border bg-blue-300 rounded-lg hover:bg-blue-400 transition-colors"
        >
          <Plus />
          <span className="ms-2">New User</span>
        </Link>
      </div>
      <UsersTable columns={columns} data={data || []} />
    </div>
  );
}
