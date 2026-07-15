import type { LandingCategory, PublicMenuItem, GalleryImage } from "./types";

export interface ILandingRepository {
  getPublicCategories(): Promise<LandingCategory[]>;
  getPublicMenuItems(): Promise<PublicMenuItem[]>;
  getGalleryImages(): Promise<GalleryImage[]>;
}
