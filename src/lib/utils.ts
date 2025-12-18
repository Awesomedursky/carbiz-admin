import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasActiveFilters = (
  filters: Record<string, any>,
  defaults: Record<string, any>
) => {
  return Object.entries(filters).some(([key, value]) => {
    if (value === undefined || value === null) return false;

    // arrays (multi-select)
    if (Array.isArray(value)) return value.length > 0;

    // default comparison
    if (key in defaults) {
      return value !== defaults[key];
    }

    return true;
  });
};
