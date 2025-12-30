import { create } from "zustand";

export type TableFilterType = {
  adminAccess?: ("SUPER_ADMIN" | "ADMIN")[];
  endDate?: string;
  startDate?: string;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
  status?: ("ACTIVE" | "INACTIVE")[];
  Audience?: ("SYSTEM" | "ADMIN")[];
  recurringType?: ("DAILY" | "WEEKLY" | "MONTHLY")[];
  method?: ("EMAIL" | "SMS" | "PUSH")[];
  orderStatus?: ("PENDING" | "ENROUTE" | "DELIVERED")[];
  paymentStatus?: ("PAID" | "UNPAID" | "FAILED")[];
  paymentMethod?: ("CARD" | "TRANSFER" | "CASH")[];
  role?: ("RIDER" | "MERCHANT" | "CUSTOMER")[];
  availabilityStatus?: ("AVAILABLE" | "UNAVAILABLE")[];
  audience?: "MERCHANTS" | "RIDERS" | "CUSTOMERS" | "ALL_USERS"[];
  deliveryMethod?: ("EMAIL" | "PUSH_NOTIFICATION")[];
};

export interface TableState {
  total: number;
  pageSize: number;
  currentPage: number;
  searchTerm?: string;
  filters: TableFilterType;
}

export interface TableStore {
  tables: Record<string, TableState>;
  initTable: (key: string) => void;
  setCurrentPage: (key: string, page: number) => void;
  setSearchTerm: (key: string, term: string | undefined) => void;
  updateFilters: (key: string, patch: Partial<TableFilterType>) => void;
  resetFilters: (key: string) => void;
  setTotal: (key: string, total: number) => void;
}

export const defaultFilters: TableFilterType = {
  sortBy: "createdAt",
  sortOrder: "DESC",
};

export const defaultTableState: TableState = {
  total: 1,
  pageSize: 10,
  currentPage: 1,
  searchTerm: undefined,
  filters: defaultFilters,
};

export const useTableStore = create<TableStore>((set) => ({
  tables: {},

  initTable: (key) =>
    set((state) => {
      if (state.tables[key]) return state; // already exists
      return {
        tables: {
          ...state.tables,
          [key]: { ...defaultTableState },
        },
      };
    }),

  setCurrentPage: (key, page) =>
    set((state) => ({
      tables: {
        ...state.tables,
        [key]: { ...state.tables[key], currentPage: page },
      },
    })),

  setTotal: (key, total) =>
    set((state) => ({
      tables: {
        ...state.tables,
        [key]: { ...state.tables[key], total },
      },
    })),

  setSearchTerm: (key, term) =>
    set((state) => ({
      tables: {
        ...state.tables,
        [key]: { ...state.tables[key], searchTerm: term },
      },
    })),

  updateFilters: (key, patch) =>
    set((state) => ({
      tables: {
        ...state.tables,
        [key]: {
          ...state.tables[key],
          filters: { ...state.tables[key].filters, ...patch },
          currentPage: 1,
        },
      },
    })),

  resetFilters: (key) =>
    set((state) => ({
      tables: {
        ...state.tables,
        [key]: { ...defaultTableState },
      },
    })),
}));
