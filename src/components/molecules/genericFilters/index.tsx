// useTableStore.ts
import { create } from "zustand";

export type TableFilterType = {
  adminAccess?: ("SUPER_ADMIN" | "ADMIN")[];
  endDate?: string;
  startDate?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  status?: ("ACTIVE" | "INACTIVE")[];
  sentBy?: ("SYSTEM" | "ADMIN")[];
  recurringType?: ("DAILY" | "WEEKLY" | "MONTHLY")[];
  method?: ("EMAIL" | "SMS" | "PUSH")[];
  deliveryStatus?: ("PENDING" | "ENROUTE" | "DELIVERED")[];
  paymentStatus?: ("PAID" | "UNPAID" | "FAILED")[];
  paymentMethod?: ("CARD" | "TRANSFER" | "CASH")[];
  role?: ("RIDER" | "MERCHANT" | "CUSTOMER")[];
  availabilityStatus?: ("AVAILABLE" | "UNAVAILABLE")[];
};

export interface TableStore {
  total: number;
  pageSize: number;
  currentPage: number;
  searchTerm?: string;

  filters: TableFilterType;

  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string | undefined) => void;

  updateFilters: (patch: Partial<TableFilterType>) => void;
  resetFilters: () => void;
}

export const defaultFilters: TableFilterType = {
  adminAccess: undefined,
  endDate: undefined,
  startDate: undefined,
  sortBy: "createdAt",
  sortOrder: "DESC",
  status: undefined,
  sentBy: undefined,
  recurringType: undefined,
  method: undefined,
  deliveryStatus: undefined,
  paymentStatus: undefined,
  paymentMethod: undefined,
  role: undefined,
  availabilityStatus: undefined,
};

export const useTableStore = create<TableStore>((set) => ({
  total: 1,
  pageSize: 10,
  currentPage: 1,
  searchTerm: undefined,

  filters: defaultFilters,

  setCurrentPage: (page) => set({ currentPage: page }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  updateFilters: (patch) =>
    set((state) => ({
      filters: { ...state.filters, ...patch },
      currentPage: 1,
    })),

  resetFilters: () =>
    set({
      filters: defaultFilters,
      currentPage: 1,
    }),
}));

// GenericFilters.tsx
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import { useDrawerStore } from "@/store/drawer.store";
// import { formatISO } from "date-fns";
import { PopoverContent } from "@/components/ui/popover";

// type GenericFiltersProps = {
//   tableName: string;
// };

// const OPTION_MAP = {
//   adminAccess: ["SUPER_ADMIN", "ADMIN"],
//   status: ["ACTIVE", "INACTIVE"],
//   deliveryStatus: ["PENDING", "ENROUTE", "DELIVERED"],
//   paymentStatus: ["PAID", "UNPAID", "FAILED"],
//   paymentMethod: ["CARD", "TRANSFER", "CASH"],
//   availabilityStatus: ["AVAILABLE", "UNAVAILABLE"],
//   method: ["EMAIL", "SMS", "PUSH"],
//   recurringType: ["DAILY", "WEEKLY", "MONTHLY"],
//   role: ["RIDER", "MERCHANT", "CUSTOMER"],
//   sentBy: ["SYSTEM", "ADMIN"],
// } as const;

// function useInitialFilters(storeFilters?: Partial<TableFilterType>) {
//   return {
//     startDate: storeFilters?.startDate ?? undefined,
//     endDate: storeFilters?.endDate ?? undefined,
//     adminAccess: storeFilters?.adminAccess ?? undefined,
//     status: storeFilters?.status ?? undefined,
//     deliveryStatus: storeFilters?.deliveryStatus ?? undefined,
//     paymentStatus: storeFilters?.paymentStatus ?? undefined,
//     paymentMethod: storeFilters?.paymentMethod ?? undefined,
//     availabilityStatus: storeFilters?.availabilityStatus ?? undefined,
//     method: storeFilters?.method ?? undefined,
//     recurringType: storeFilters?.recurringType ?? undefined,
//     role: storeFilters?.role ?? undefined,
//     sentBy: storeFilters?.sentBy ?? undefined,
//   } as Partial<TableFilterType>;
// }

const GenericFilters = () => {
  return (
    <PopoverContent align="end" className=" mt-2 w-xs">
      <div>Test test</div>
    </PopoverContent>
  );
};

export default GenericFilters;
