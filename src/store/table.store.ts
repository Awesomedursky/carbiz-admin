import { create } from "zustand";

interface TableStore {
  total: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchTerm: string | undefined;
  setSearchTerm: (s: string | undefined) => void;
}

const useTableStore = create<TableStore>((set) => ({
  total: 1,
  pageSize: 10,
  currentPage: 1,
  searchTerm: undefined,
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
}));

export default useTableStore;

// import { create } from "zustand";

// // 1. Define all filters (all optional)
// export interface TableFilters {
//   adminAccess?: string;
//   endDate?: string;
//   startDate?: string;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
//   status?: string;
//   sentBy?: string;
//   recurringType?: string;
//   method?: string;
//   deliveryStatus?: string;
//   paymentStatus?: string;
//   paymentMethod?: string;
//   role?: string;
//   availabilityStatus?: string;
// }

// // 2. Define the structure for each table
// export interface TableState {
//   total: number;
//   pageSize: number;
//   currentPage: number;
//   searchTerm?: string;
//   filters: TableFilters;
// }

// // 3. Zustand store
// interface TableStore {
//   tables: Record<string, TableState>;

//   initTable: (key: string) => void;

//   setCurrentPage: (key: string, page: number) => void;
//   setSearchTerm: (key: string, term: string | undefined) => void;
//   setTotal: (key: string, total: number) => void;

//   // Filter actions
//   setFilters: (key: string, filters: Partial<TableFilters>) => void;
//   resetFilters: (key: string) => void;
//   clearAllTableState: (key: string) => void;
// }

// const useTableStore = create<TableStore>((set, get) => ({
//   tables: {},

//   initTable: (key) => {
//     const tables = get().tables;

//     if (!tables[key]) {
//       tables[key] = {
//         total: 0,
//         pageSize: 10,
//         currentPage: 1,
//         searchTerm: undefined,
//         filters: {},
//       };
//       set({ tables });
//     }
//   },

//   setCurrentPage: (key, page) => {
//     const tables = get().tables;
//     if (!tables[key]) return;

//     tables[key].currentPage = page;
//     set({ tables });
//   },

//   setSearchTerm: (key, term) => {
//     const tables = get().tables;
//     if (!tables[key]) return;

//     tables[key].searchTerm = term;
//     set({ tables });
//   },

//   setTotal: (key, total) => {
//     const tables = get().tables;
//     if (!tables[key]) return;

//     tables[key].total = total;
//     set({ tables });
//   },

//   setFilters: (key, filters) => {
//     const tables = get().tables;
//     if (!tables[key]) return;

//     tables[key].filters = {
//       ...tables[key].filters,
//       ...filters,
//     };

//     set({ tables });
//   },

//   resetFilters: (key) => {
//     const tables = get().tables;
//     if (!tables[key]) return;

//     tables[key].filters = {};
//     set({ tables });
//   },

//   clearAllTableState: (key) => {
//     const tables = get().tables;
//     if (!tables[key]) return;

//     delete tables[key]; // remove entire table state

//     set({ tables });
//   },
// }));

// export default useTableStore;
