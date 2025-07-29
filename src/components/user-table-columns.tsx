import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteUser } from "@/queries/userQueries";
import type { User } from "@/types/users";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, LoaderCircle, Trash } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          is Admin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { mutate: deleteUser, isPending } = useDeleteUser();

      return (
        <div className="flex items-center justify-between">
          {row.getValue("role") === "admin" ? (
            <span className="ms-4 rounded bg-blue-100 p-1">Yes</span>
          ) : (
            <span className="ms-4 rounded bg-red-100 p-1">No</span>
          )}
          <div className="flex items-center">
            <Link
              to={"/users/$userId"}
              params={{ userId: row.original.id.toString() }}
              className="flex cursor-pointer p-0 m-0"
            >
              <Edit
                size={16}
                className="cursor-pointer text-blue-500 hover:text-blue-700 text-sm"
              />
            </Link>
            <Button
              className="flex cursor-pointer p-0 m-0"
              variant={"ghost"}
              onClick={() => deleteUser(row.original.id)}
            >
              {isPending ? (
              
                <LoaderCircle
                  size={16}
                  className="animate-spin cursor-pointer text-red-500 hover:text-red-700 text-sm"
                />
              
              ) : (
                <Trash
                  size={16}
                  className=" cursor-pointer text-red-500 hover:text-red-700 text-sm"
                />
              )}
            </Button>
          </div>
        </div>
      );
    },
  },
];
