export interface CustomerEntity {
  id: string;
  name: string;
  phone: string;
  email?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: "male" | "female";
  address?: string;
  city?: string;
  notes?: string;
  preferences?: string[];
  allergies?: string[];
  favoriteItems?: string[];
  totalVisits: number;
  totalSpent: number;
  lastVisit?: string;
  isVip: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
