export interface OrderFormStoreState {
  selectedItems: Array<{
    menuItemId: string;
    name: string;
    nameAr: string;
    quantity: number;
    unitPrice: number;
    modifierSelections: Array<{
      modifierId: string;
      optionId: string;
      quantity: number;
    }>;
    specialInstructions?: string;
  }>;
  selectedTableId?: string;
  selectedCustomerId?: string;
  guestCount: number;
  orderType: "dine_in" | "takeaway" | "delivery";
  notes?: string;
}

export interface OrderFormStoreActions {
  addItem: (item: OrderFormStoreState["selectedItems"][number]) => void;
  removeItem: (menuItemId: string) => void;
  updateItemQuantity: (menuItemId: string, quantity: number) => void;
  updateItemModifiers: (
    menuItemId: string,
    modifierSelections: OrderFormStoreState["selectedItems"][number]["modifierSelections"],
  ) => void;
  setSelectedTable: (tableId?: string) => void;
  setSelectedCustomer: (customerId?: string) => void;
  setGuestCount: (count: number) => void;
  setOrderType: (type: OrderFormStoreState["orderType"]) => void;
  setNotes: (notes?: string) => void;
  reset: () => void;
}

export type OrderFormStore = OrderFormStoreState & OrderFormStoreActions;

export interface TableGridStoreState {
  filterZone?: string;
  filterStatus?: string;
  filterCapacity?: number;
  searchQuery?: string;
  selectedTableId?: string;
}

export interface TableGridStoreActions {
  setFilterZone: (zone?: string) => void;
  setFilterStatus: (status?: string) => void;
  setFilterCapacity: (capacity?: number) => void;
  setSearchQuery: (query?: string) => void;
  selectTable: (tableId?: string) => void;
  resetFilters: () => void;
}

export type TableGridStore = TableGridStoreState & TableGridStoreActions;
