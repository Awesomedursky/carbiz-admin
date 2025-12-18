import { useCallback } from "react";
import { useTableStore, defaultTableState } from "@/store/table.store";
import { tableKeyType } from "@/components/atoms/table";

export function useTableState(tableKey: tableKeyType) {
  const {
    tables,
    initTable,
    setCurrentPage,
    setSearchTerm,
    updateFilters,
    resetFilters,
    setTotal,
  } = useTableStore();

  // Ensure table namespace exists
  if (!tables[tableKey]) {
    initTable(tableKey);
  }

  const table = tables[tableKey] ?? defaultTableState;

  const setPage = useCallback(
    (page: number) => setCurrentPage(tableKey, page),
    [tableKey, setCurrentPage]
  );

  const setPageTotal = useCallback(
    (total: number) => setTotal(tableKey, total),
    [tableKey, setTotal]
  );

  const setSearch = useCallback(
    (term?: string) => setSearchTerm(tableKey, term),
    [tableKey, setSearchTerm]
  );

  const update = useCallback(
    (patch: any) => updateFilters(tableKey, patch),
    [tableKey, updateFilters]
  );

  const reset = useCallback(
    () => resetFilters(tableKey),
    [tableKey, resetFilters]
  );

  return {
    total: table.total,
    pageSize: table.pageSize,
    currentPage: table.currentPage,
    searchTerm: table.searchTerm,
    filters: table.filters,
    setPage,
    setSearch,
    setPageTotal,
    update,
    reset,
  };
}
