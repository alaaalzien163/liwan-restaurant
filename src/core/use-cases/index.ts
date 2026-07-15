export type {
  ICreateMenuItemUseCase,
  CreateMenuItemRequest,
  CreateMenuItemResponse,
} from "@/domain/use-cases/menu/create-menu-item";
export type {
  IUpdateMenuItemUseCase,
  UpdateMenuItemRequest,
  UpdateMenuItemResponse,
} from "@/domain/use-cases/menu/update-menu-item";
export type { IDeleteMenuItemUseCase } from "@/domain/use-cases/menu/delete-menu-item";
export type {
  IGetMenuItemsUseCase,
  GetMenuItemsRequest,
  GetMenuItemsResponse,
} from "@/domain/use-cases/menu/get-menu-items";
export type { IGetMenuItemByIdUseCase } from "@/domain/use-cases/menu/get-menu-item-by-id";
export type {
  ICreateOrderUseCase,
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/domain/use-cases/order/create-order";
export type {
  IUpdateOrderStatusUseCase,
  UpdateOrderStatusRequest,
  UpdateOrderStatusResponse,
} from "@/domain/use-cases/order/update-order-status";
export type { ICancelOrderUseCase } from "@/domain/use-cases/order/cancel-order";
export type {
  IGetOrdersUseCase,
  GetOrdersRequest,
  GetOrdersResponse,
} from "@/domain/use-cases/order/get-orders";
export type { IGetOrderByIdUseCase } from "@/domain/use-cases/order/get-order-by-id";
export type {
  IAddItemsToOrderUseCase,
  AddItemsToOrderRequest,
} from "@/domain/use-cases/order/add-items-to-order";
export type {
  ICreateReservationUseCase,
  CreateReservationRequest,
  CreateReservationResponse,
} from "@/domain/use-cases/reservation/create-reservation";
export type {
  IUpdateReservationUseCase,
  UpdateReservationRequest,
  UpdateReservationResponse,
} from "@/domain/use-cases/reservation/update-reservation";
export type { ICancelReservationUseCase } from "@/domain/use-cases/reservation/cancel-reservation";
export type {
  IGetReservationsUseCase,
  GetReservationsRequest,
  GetReservationsResponse,
} from "@/domain/use-cases/reservation/get-reservations";
export type { IGetAvailableTimeSlotsUseCase } from "@/domain/use-cases/reservation/get-available-time-slots";
export type {
  IUpdateStockUseCase,
  UpdateStockRequest,
  UpdateStockResponse,
} from "@/domain/use-cases/inventory/update-stock";
export type {
  IGetInventoryItemsUseCase,
  GetInventoryItemsRequest,
  GetInventoryItemsResponse,
} from "@/domain/use-cases/inventory/get-inventory-items";
export type { IGetLowStockItemsUseCase } from "@/domain/use-cases/inventory/get-low-stock-items";
export type {
  IAssignStaffUseCase,
  AssignStaffRequest,
} from "@/domain/use-cases/staff/assign-staff";
export type {
  IGetStaffMembersUseCase,
  GetStaffMembersRequest,
  GetStaffMembersResponse,
} from "@/domain/use-cases/staff/get-staff-members";
export type {
  IClockInUseCase,
  IClockOutUseCase,
} from "@/domain/use-cases/staff/clock-in-out";
export type {
  ILoginUseCase,
  ILoginWithPinUseCase,
} from "@/domain/use-cases/auth/login";
export type { ILogoutUseCase } from "@/domain/use-cases/auth/logout";
export type { IGetCurrentUserUseCase } from "@/domain/use-cases/auth/get-current-user";
export type { IChangePasswordUseCase } from "@/domain/use-cases/auth/change-password";
export type {
  IGetDashboardStatsUseCase,
  GetDashboardStatsRequest,
  DashboardStats,
} from "@/domain/use-cases/dashboard/get-dashboard-stats";
export type {
  ICreateCustomerUseCase,
  CreateCustomerRequest,
  CreateCustomerResponse,
} from "@/domain/use-cases/customer/create-customer";
export type {
  IGetCustomersUseCase,
  GetCustomersRequest,
  GetCustomersResponse,
} from "@/domain/use-cases/customer/get-customers";
export type { ISearchCustomersUseCase } from "@/domain/use-cases/customer/search-customers";
export type {
  IUpdateTableStatusUseCase,
  UpdateTableStatusRequest,
} from "@/domain/use-cases/table/update-table-status";
export type {
  IGetTablesUseCase,
  GetTablesRequest,
  GetTablesResponse,
} from "@/domain/use-cases/table/get-tables";
