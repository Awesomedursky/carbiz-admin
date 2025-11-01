import { create } from "zustand";

interface TableStore {
  total: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const useTableStore = create<TableStore>((set) => ({
  total: 1,
  pageSize: 10,
  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),
}));

export default useTableStore;
