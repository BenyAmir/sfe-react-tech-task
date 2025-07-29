import { deleteUserApi } from "@/api/deleteUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToken } from "@/store/auth";
import type { User } from "@/types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { LoaderCircle, Trash } from "lucide-react";
import React from "react";

interface UsersTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function UsersTable({ columns, data }: UsersTableProps<User>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  const queryClient = useQueryClient();
  const token = useToken();

  const { mutate: deleteUser, isPending } = useMutation({
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

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter usernames..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {rowSelection && Object.keys(rowSelection).length > 0 && (
          <Button
            className="ml-4 cursor-pointer"
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={() => deleteUser()}
          >
            {isPending ? (
              <span className="animate-spin">
                <LoaderCircle
                  size={16}
                  className=" cursor-pointer text-red-500 hover:text-red-700 text-sm"
                />
              </span>
            ) : (
              <div className="flex items-center">
                <Trash size={8} className="me-2" />
                Delete {table.getFilteredSelectedRowModel().rows.length} Rows
              </div>
            )}
          </Button>
        )}
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
