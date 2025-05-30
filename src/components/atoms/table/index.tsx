import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchNormal } from "iconsax-reactjs";
import { FunnelSimple } from "@phosphor-icons/react";
import { Pagination } from "./pagination";
import { useLocation, useNavigate } from "react-router";
import useTableStore from "@/store/table.store";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableName?: string;
  isClickable?: boolean;
  showSearch?: boolean;
  actions?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  columnKey?: keyof TData; // Better type safety
  onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableName = "Recent Records",
  isClickable = false,
  showSearch = true,
  actions = false,
  loading = false,
  children,
  columnKey,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const route = pathname.split("/").pop() ?? "";

  const { currentPage, pageSize, total = 0, setCurrentPage } = useTableStore();

  const table = useReactTable<TData>({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = (value: string) => {
    // Optional: Implement debounced or server-side search
    Example: table.setGlobalFilter(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <div className="rounded-md border bg-white">
      <div className="p-4 md:p-8 flex flex-wrap items-center gap-4 sm:gap-4 md:gap-8 lg:gap-12">
        <h1 className="text-[#020202] font-bold text-xl">{tableName}</h1>

        {showSearch && (
          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <SearchNormal
                className="absolute left-2 text-gray-500"
                size={16}
              />
              <Input
                placeholder="Search here..."
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8 md:min-w-sm text-sm md:py-6"
              />
            </div>
            <Button
              variant="outline"
              className="md:py-6 border-0 shadow text-xs md:text-sm font-medium text-[#807F94]"
            >
              <FunnelSimple className="size-5" />
              Filter
            </Button>
          </div>
        )}

        {actions && (
          <div className="flex items-center gap-4 lg:ml-auto">{children}</div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          Fetching data...
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] border border-dashed border-gray-300 m-4">
          <h3 className="text-lg font-medium text-gray-800">
            No records found
          </h3>
          {/* <p className="text-sm text-gray-500 mt-1">
            Your journey begins here. Add your first record to get started.
          </p> */}
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#FAFAFB]">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.map((row) => {
                const rowId = columnKey ? row.original?.[columnKey] : undefined;

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() =>
                      isClickable &&
                      columnKey &&
                      rowId &&
                      navigate(`/${route}/${rowId}`)
                    }
                    className={isClickable ? "cursor-pointer" : ""}
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
                );
              })}
            </TableBody>
          </Table>

          <Pagination
            total={total}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
