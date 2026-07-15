import { create } from "zustand";

interface CategoryUIState {
  search: string;
  statusFilter: "all" | "active" | "inactive";
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: number;
  setSearch: (search: string) => void;
  setStatusFilter: (filter: "all" | "active" | "inactive") => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setPage: (page: number) => void;
}

export const useCategoryStore = create<CategoryUIState>((set) => ({
  search: "",
  statusFilter: "all",
  sortBy: "displayOrder",
  sortOrder: "asc",
  page: 1,
  pageSize: 10,
  setSearch: (search) => set({ search, page: 1 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setPage: (page) => set({ page }),
}));
