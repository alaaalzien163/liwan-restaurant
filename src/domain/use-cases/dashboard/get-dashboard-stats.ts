export interface DailySalesSummary {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalItemsSold: number;
  peakHour?: string;
}

export interface TopSellingItem {
  menuItemId: string;
  name: string;
  nameAr: string;
  quantity: number;
  revenue: number;
}

export interface StaffPerformance {
  staffId: string;
  name: string;
  ordersProcessed: number;
  totalSales: number;
  averageServiceTime: number;
}

export interface DashboardStats {
  dailySummary: DailySalesSummary;
  weeklyTrend: Array<{ date: string; revenue: number; orders: number }>;
  topSellingItems: TopSellingItem[];
  staffPerformance: StaffPerformance[];
  activeOrders: number;
  tablesOccupied: number;
  tablesAvailable: number;
  tablesReserved: number;
  reservationsToday: number;
  lowStockItems: number;
  totalStaffOnDuty: number;
}

export type GetDashboardStatsRequest = {
  date?: string;
};

export interface IGetDashboardStatsUseCase {
  execute(request?: GetDashboardStatsRequest): Promise<DashboardStats>;
}
