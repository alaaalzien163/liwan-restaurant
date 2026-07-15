import { create } from "zustand";

interface MenuItemUIState {
  search: string;
  categoryFilter: string;
  availabilityFilter: "all" | "available" | "unavailable";
  featuredFilter: "all" | "featured" | "not-featured";
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: number;
  setSearch: (search: string) => void;
  setCategoryFilter: (id: string) => void;
  setAvailabilityFilter: (f: "all" | "available" | "unavailable") => void;
  setFeaturedFilter: (f: "all" | "featured" | "not-featured") => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setPage: (page: number) => void;
}

export const useMenuItemStore = create<MenuItemUIState>((set) => ({
  search: "",
  categoryFilter: "",
  availabilityFilter: "all",
  featuredFilter: "all",
  sortBy: "displayOrder",
  sortOrder: "asc",
  page: 1,
  pageSize: 10,
  setSearch: (search) => set({ search, page: 1 }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter, page: 1 }),
  setAvailabilityFilter: (availabilityFilter) =>
    set({ availabilityFilter, page: 1 }),
  setFeaturedFilter: (featuredFilter) => set({ featuredFilter, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setPage: (page) => set({ page }),
}));
